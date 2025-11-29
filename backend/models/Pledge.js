const mongoose = require('mongoose');

const pledgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email'
    }
  },
  pledges: [{
    type: String,
    required: true,
    enum: {
      values: [
        'shorter-showers',
        'fix-leaks',
        'full-loads',
        'turn-off-tap',
        'rainwater',
        'spread-awareness'
      ],
      message: 'Please select valid pledge options'
    }
  }],
  waterSaved: {
    type: Number,
    default: 0 // Estimated liters saved per day
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
pledgeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate estimated water savings based on pledges
pledgeSchema.methods.calculateWaterSavings = function() {
  const savingsRates = {
    'shorter-showers': 40, // liters per shower
    'fix-leaks': 750, // liters per day
    'full-loads': 20, // liters per load
    'turn-off-tap': 24, // liters per day
    'rainwater': 5000, // liters per year
    'spread-awareness': 0 // no direct savings
  };

  let dailySavings = 0;
  this.pledges.forEach(pledge => {
    if (savingsRates[pledge]) {
      if (pledge === 'rainwater') {
        // Convert yearly to daily
        dailySavings += savingsRates[pledge] / 365;
      } else {
        dailySavings += savingsRates[pledge];
      }
    }
  });

  this.waterSaved = Math.round(dailySavings);
  return this.save();
};

// Index for better query performance
pledgeSchema.index({ createdAt: -1 });
pledgeSchema.index({ user: 1 });

module.exports = mongoose.model('Pledge', pledgeSchema);
