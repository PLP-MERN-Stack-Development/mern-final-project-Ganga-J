const mongoose = require('mongoose');

const waterStatisticSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: {
      values: [
        'global_population_without_water',
        'global_population_without_sanitation',
        'global_population_without_handwashing',
        'deaths_from_water_sanitation',
        'total_pledges',
        'total_water_saved_monthly',
        'countries_represented',
        'communities_reached'
      ],
      message: 'Invalid statistic type'
    }
  },
  value: {
    type: Number,
    required: true,
    min: [0, 'Statistic value cannot be negative']
  },
  unit: {
    type: String,
    default: '',
    enum: {
      values: ['', 'million', 'deaths/year', 'liters', 'countries', 'communities'],
      message: 'Invalid unit'
    }
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  source: {
    type: String,
    default: 'UN/World Health Organization',
    maxlength: [100, 'Source cannot be more than 100 characters']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updateFrequency: {
    type: String,
    enum: {
      values: ['static', 'daily', 'weekly', 'monthly', 'yearly'],
      message: 'Invalid update frequency'
    },
    default: 'static'
  }
});

// Update the lastUpdated field before saving
waterStatisticSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to get all active statistics
waterStatisticSchema.statics.getActiveStats = function() {
  return this.find({ isActive: true }).sort({ type: 1 });
};

// Static method to update statistic value
waterStatisticSchema.statics.updateValue = function(type, newValue) {
  return this.findOneAndUpdate(
    { type },
    { value: newValue, lastUpdated: new Date() },
    { new: true, runValidators: true }
  );
};

// Static method to increment statistic value
waterStatisticSchema.statics.incrementValue = function(type, increment = 1) {
  return this.findOneAndUpdate(
    { type },
    { $inc: { value: increment }, lastUpdated: new Date() },
    { new: true, runValidators: true }
  );
};

// Index for better query performance
waterStatisticSchema.index({ type: 1 }, { unique: true });
waterStatisticSchema.index({ isActive: 1, lastUpdated: -1 });

module.exports = mongoose.model('WaterStatistic', waterStatisticSchema);
