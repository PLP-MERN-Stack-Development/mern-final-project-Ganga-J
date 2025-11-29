import React, { useState } from 'react';
import './Tips.css';

const Tips = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const tips = [
    {
      id: 1,
      category: 'shower',
      icon: 'fas fa-shower',
      title: 'Take Shorter Showers',
      description: 'Limit your showers to 5 minutes. This can save up to 12.5 gallons (47 liters) of water per shower.',
      savings: '40L per shower'
    },
    {
      id: 2,
      category: 'kitchen',
      icon: 'fas fa-utensils',
      title: 'Run Full Dishwasher Loads',
      description: 'Wait until you have a full load before running the dishwasher. This saves water compared to hand washing.',
      savings: '20L per load'
    },
    {
      id: 3,
      category: 'laundry',
      icon: 'fas fa-tshirt',
      title: 'Wash Clothes in Cold Water',
      description: 'Washing clothes in cold water saves energy and water. Modern detergents work just as well.',
      savings: '15L per load'
    },
    {
      id: 4,
      category: 'bathroom',
      icon: 'fas fa-toilet',
      title: 'Fix Leaky Faucets',
      description: 'A dripping faucet can waste up to 3,000 gallons (11,355 liters) of water per year.',
      savings: '750L per day'
    },
    {
      id: 5,
      category: 'kitchen',
      icon: 'fas fa-faucet',
      title: 'Turn Off the Tap',
      description: 'Don\'t let water run while brushing teeth, washing dishes, or shaving.',
      savings: '24L per day'
    },
    {
      id: 6,
      category: 'outdoor',
      icon: 'fas fa-seedling',
      title: 'Water Lawns Efficiently',
      description: 'Water your lawn or garden during cooler parts of the day to reduce evaporation.',
      savings: '30% less water'
    },
    {
      id: 7,
      category: 'kitchen',
      icon: 'fas fa-recycle',
      title: 'Collect Rainwater',
      description: 'Install rain barrels to collect rainwater for outdoor use and reduce your water bill.',
      savings: '5,000L per year'
    },
    {
      id: 8,
      category: 'general',
      icon: 'fas fa-users',
      title: 'Spread Awareness',
      description: 'Share water-saving tips with friends and family. Knowledge is the first step to change.',
      savings: 'Community impact'
    },
    {
      id: 9,
      category: 'bathroom',
      icon: 'fas fa-shower',
      title: 'Install Low-Flow Showerheads',
      description: 'Replace old showerheads with low-flow models that use less water without sacrificing pressure.',
      savings: '50% less water'
    },
    {
      id: 10,
      category: 'kitchen',
      icon: 'fas fa-utensils',
      title: 'Scrape, Don\'t Rinse',
      description: 'Scrape food off dishes instead of rinsing them before putting them in the dishwasher.',
      savings: '5L per meal'
    },
    {
      id: 11,
      category: 'laundry',
      icon: 'fas fa-tshirt',
      title: 'Air Dry Clothes',
      description: 'Hang clothes to dry instead of using the dryer. This saves both water and energy.',
      savings: 'Energy savings'
    },
    {
      id: 12,
      category: 'outdoor',
      icon: 'fas fa-car',
      title: 'Wash Car Efficiently',
      description: 'Use a bucket and sponge instead of a hose. Or better yet, take your car to a car wash that recycles water.',
      savings: '150L per wash'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tips', icon: 'fas fa-list' },
    { id: 'shower', label: 'Shower', icon: 'fas fa-shower' },
    { id: 'kitchen', label: 'Kitchen', icon: 'fas fa-utensils' },
    { id: 'bathroom', label: 'Bathroom', icon: 'fas fa-toilet' },
    { id: 'laundry', label: 'Laundry', icon: 'fas fa-tshirt' },
    { id: 'outdoor', label: 'Outdoor', icon: 'fas fa-seedling' },
    { id: 'general', label: 'General', icon: 'fas fa-lightbulb' }
  ];

  const filteredTips = activeFilter === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeFilter);

  return (
    <div className="tips">
      <div className="container">
        <div className="section-header">
          <h1>Water-Saving <span className="highlight">Tips</span></h1>
          <p>Simple actions that make a big difference</p>
        </div>

        <div className="tips-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              <i className={category.icon}></i>
              {category.label}
            </button>
          ))}
        </div>

        <div className="tips-grid">
          {filteredTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-icon">
                <i className={tip.icon}></i>
              </div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
              <div className="tip-savings">
                <span className="savings-badge">
                  <i className="fas fa-water"></i>
                  {tip.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
