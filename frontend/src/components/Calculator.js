import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [usage, setUsage] = useState({
    shower: 10, // minutes per day
    dishwasher: 1, // loads per week
    washingMachine: 3, // loads per week
    toilet: 5, // flushes per day
    faucet: 15, // minutes per day
    carWash: 0, // times per month
    lawnWatering: 20 // minutes per day
  });

  const [results, setResults] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    breakdown: {}
  });

  // Water usage rates (liters)
  const rates = {
    shower: 9.5, // liters per minute
    dishwasher: 20, // liters per load
    washingMachine: 60, // liters per load
    toilet: 6, // liters per flush
    faucet: 5.7, // liters per minute
    carWash: 200, // liters per wash
    lawnWatering: 15 // liters per minute
  };

  // Frequency multipliers
  const multipliers = {
    shower: 1, // per day
    dishwasher: 1/7, // weekly to daily
    washingMachine: 3/7, // weekly to daily
    toilet: 1, // per day
    faucet: 1, // per day
    carWash: 1/30, // monthly to daily
    lawnWatering: 1 // per day
  };

  useEffect(() => {
    calculateUsage();
  }, [usage]);

  const calculateUsage = () => {
    let dailyTotal = 0;
    const breakdown = {};

    Object.keys(usage).forEach(activity => {
      const activityUsage = usage[activity] * rates[activity] * multipliers[activity];
      breakdown[activity] = Math.round(activityUsage);
      dailyTotal += activityUsage;
    });

    const daily = Math.round(dailyTotal);
    const weekly = Math.round(dailyTotal * 7);
    const monthly = Math.round(dailyTotal * 30);
    const yearly = Math.round(dailyTotal * 365);

    setResults({
      daily,
      weekly,
      monthly,
      yearly,
      breakdown
    });
  };

  const handleSliderChange = (activity, value) => {
    setUsage(prev => ({
      ...prev,
      [activity]: value
    }));
  };

  const getRating = (dailyUsage) => {
    if (dailyUsage < 100) return { icon: 'leaf', text: 'Excellent! Very water conscious.', color: 'green' };
    if (dailyUsage < 150) return { icon: 'thumbs-up', text: 'Good! Room for some improvements.', color: 'blue' };
    if (dailyUsage < 200) return { icon: 'balance-scale', text: 'Average. Consider water-saving habits.', color: 'yellow' };
    if (dailyUsage < 300) return { icon: 'exclamation-triangle', text: 'High usage. Time to make changes!', color: 'orange' };
    return { icon: 'exclamation-triangle', text: 'Very high usage. Immediate action needed!', color: 'red' };
  };

  const rating = getRating(results.daily);

  const activityLabels = {
    shower: { label: 'Daily Shower Time', unit: 'minutes', icon: 'fas fa-shower' },
    dishwasher: { label: 'Dishwasher Loads', unit: 'per week', icon: 'fas fa-utensils' },
    washingMachine: { label: 'Washing Machine Loads', unit: 'per week', icon: 'fas fa-tshirt' },
    toilet: { label: 'Toilet Flushes', unit: 'per day', icon: 'fas fa-toilet' },
    faucet: { label: 'Faucet Running Time', unit: 'minutes', icon: 'fas fa-faucet' },
    carWash: { label: 'Car Washes', unit: 'per month', icon: 'fas fa-car' },
    lawnWatering: { label: 'Lawn Watering Time', unit: 'minutes', icon: 'fas fa-seedling' }
  };

  return (
    <div className="calculator">
      <div className="container">
        <div className="section-header">
          <h1>Water Usage <span className="highlight">Calculator</span></h1>
          <p>Calculate your daily water consumption and discover ways to save</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-form">
            {Object.keys(usage).map(activity => (
              <div key={activity} className="form-group">
                <label>
                  <i className={activityLabels[activity].icon}></i>
                  {activityLabels[activity].label}
                </label>
                <input
                  type="range"
                  min="0"
                  max={activity === 'shower' || activity === 'faucet' || activity === 'lawnWatering' ? 60 :
                       activity === 'dishwasher' || activity === 'washingMachine' ? 14 :
                       activity === 'toilet' ? 20 : 12}
                  value={usage[activity]}
                  onChange={(e) => handleSliderChange(activity, parseInt(e.target.value))}
                />
                <span className="range-value">
                  {usage[activity]} {activityLabels[activity].unit}
                </span>
              </div>
            ))}
          </div>

          <div className="calculator-results">
            <div className="result-card">
              <h3>Your Daily Water Usage</h3>
              <div className="result-number">
                {results.daily.toLocaleString()}
                <span className="unit">liters</span>
              </div>
              <div className="result-comparison">
                That's like filling {Math.round(results.daily / 200)} bathtubs per day!
              </div>
            </div>

            <div className="result-breakdown">
              <h4>Usage Breakdown</h4>
              {Object.keys(results.breakdown).map(activity => (
                <div key={activity} className="breakdown-item">
                  <span className="breakdown-label">
                    <i className={activityLabels[activity].icon}></i>
                    {activityLabels[activity].label}
                  </span>
                  <span className="breakdown-value">
                    {results.breakdown[activity]} L
                  </span>
                </div>
              ))}
            </div>

            <div className="result-rating">
              <div className={`rating-icon ${rating.icon}`}>
                <i className={`fas fa-${rating.icon}`}></i>
              </div>
              <p>{rating.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
