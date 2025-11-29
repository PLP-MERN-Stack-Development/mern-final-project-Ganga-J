const express = require('express');
const WaterStatistic = require('../models/WaterStatistic');
const Pledge = require('../models/Pledge');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all statistics
router.get('/', optionalAuth, async (req, res) => {
  try {
    let stats = await WaterStatistic.find({}).sort({ createdAt: -1 });

    // If no stats in database, return default stats
    if (stats.length === 0) {
      stats = [
        {
          type: 'global_population_without_water',
          value: 2200000000,
          unit: 'million',
          description: 'People worldwide lack access to safe drinking water',
          source: 'UN/World Health Organization'
        },
        {
          type: 'global_population_without_sanitation',
          value: 4200000000,
          unit: 'million',
          description: 'People worldwide lack access to safely managed sanitation',
          source: 'UN/World Health Organization'
        },
        {
          type: 'global_population_without_handwashing',
          value: 3000000000,
          unit: 'million',
          description: 'People worldwide lack basic handwashing facilities',
          source: 'UN/World Health Organization'
        },
        {
          type: 'deaths_from_water_sanitation',
          value: 829000,
          unit: '',
          description: 'Daily deaths from water, sanitation and hygiene-related causes',
          source: 'UN/World Health Organization'
        }
      ];
    }

    // Add dynamic stats from pledges
    const totalPledges = await Pledge.countDocuments();
    const totalWaterSaved = await Pledge.aggregate([
      { $group: { _id: null, total: { $sum: '$waterSaved' } } }
    ]);

    const dynamicStats = [
      {
        type: 'total_pledges',
        value: totalPledges,
        unit: '',
        description: 'Total pledges made on AquaGuard platform',
        source: 'AquaGuard Platform'
      },
      {
        type: 'total_water_saved_monthly',
        value: totalWaterSaved.length > 0 ? totalWaterSaved[0].total * 30 : 0,
        unit: '',
        description: 'Liters of water saved monthly through pledges',
        source: 'AquaGuard Platform'
      }
    ];

    const allStats = [...stats, ...dynamicStats];

    res.json(allStats);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error fetching statistics' });
  }
});

// Get pledge statistics
router.get('/pledges', optionalAuth, async (req, res) => {
  try {
    const totalPledges = await Pledge.countDocuments();
    const totalWaterSaved = await Pledge.aggregate([
      { $group: { _id: null, total: { $sum: '$waterSaved' } } }
    ]);

    const monthlyPledges = await Pledge.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          waterSaved: { $sum: '$waterSaved' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    const pledgeBreakdown = await Pledge.aggregate([
      { $unwind: '$pledges' },
      { $group: { _id: '$pledges', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalPledges,
      totalWaterSaved: totalWaterSaved.length > 0 ? totalWaterSaved[0].total : 0,
      monthlyPledges,
      pledgeBreakdown
    });
  } catch (error) {
    console.error('Error fetching pledge statistics:', error);
    res.status(500).json({ message: 'Server error fetching pledge statistics' });
  }
});

// Create or update statistic (admin only - for future use)
router.post('/', async (req, res) => {
  try {
    const { type, value, unit, description, source } = req.body;

    const statistic = new WaterStatistic({
      type,
      value,
      unit,
      description,
      source
    });

    await statistic.save();
    res.status(201).json(statistic);
  } catch (error) {
    console.error('Error creating statistic:', error);
    res.status(500).json({ message: 'Server error creating statistic' });
  }
});

// Update statistic (admin only - for future use)
router.put('/:id', async (req, res) => {
  try {
    const { type, value, unit, description, source } = req.body;

    const statistic = await WaterStatistic.findByIdAndUpdate(
      req.params.id,
      { type, value, unit, description, source },
      { new: true, runValidators: true }
    );

    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }

    res.json(statistic);
  } catch (error) {
    console.error('Error updating statistic:', error);
    res.status(500).json({ message: 'Server error updating statistic' });
  }
});

// Delete statistic (admin only - for future use)
router.delete('/:id', async (req, res) => {
  try {
    const statistic = await WaterStatistic.findByIdAndDelete(req.params.id);

    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }

    res.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    res.status(500).json({ message: 'Server error deleting statistic' });
  }
});

module.exports = router;
