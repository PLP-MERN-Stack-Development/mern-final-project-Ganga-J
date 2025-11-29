import React, { useState, useEffect } from 'react';
import { statisticsAPI } from '../services/api';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await statisticsAPI.getAll();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      // Fallback to static data if API fails
      setStats([
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
        },
        {
          type: 'total_pledges',
          value: 1247,
          unit: '',
          description: 'Total pledges made on AquaGuard platform',
          source: 'AquaGuard Platform'
        },
        {
          type: 'total_water_saved_monthly',
          value: 2500000,
          unit: '',
          description: 'Liters of water saved monthly through pledges',
          source: 'AquaGuard Platform'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'global_population_without_water':
        return 'fas fa-tint';
      case 'global_population_without_sanitation':
        return 'fas fa-toilet';
      case 'global_population_without_handwashing':
        return 'fas fa-hands-wash';
      case 'deaths_from_water_sanitation':
        return 'fas fa-heartbeat';
      case 'total_pledges':
        return 'fas fa-users';
      case 'total_water_saved_monthly':
        return 'fas fa-water';
      default:
        return 'fas fa-chart-bar';
    }
  };

  const formatValue = (value, unit) => {
    if (unit === 'million') {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString();
  };

  const getProgressPercentage = (type) => {
    // Mock progress data - in real app this would come from API
    const progressData = {
      'global_population_without_water': 15,
      'global_population_without_sanitation': 20,
      'global_population_without_handwashing': 25,
      'deaths_from_water_sanitation': 10,
      'total_pledges': 75,
      'total_water_saved_monthly': 80
    };
    return progressData[type] || 50;
  };

  if (loading) {
    return (
      <div className="statistics">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="statistics">
      <div className="container">
        <div className="section-header">
          <h1>Global Water <span className="highlight">Statistics</span></h1>
          <p>Understanding the scale of the water crisis and our progress toward SDG 6</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.type || index} className="stat-card">
              <div className="stat-icon">
                <i className={getIcon(stat.type)}></i>
              </div>
              <div className="stat-number">
                {formatValue(stat.value, stat.unit)}
              </div>
              <div className="stat-unit">{stat.unit}</div>
              <div className="stat-label">{stat.description}</div>
              <div className="stat-bar">
                <div
                  className="stat-progress"
                  style={{ width: `${getProgressPercentage(stat.type)}%` }}
                ></div>
              </div>
              <div className="stat-source">
                Source: {stat.source}
              </div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <h3>Regional Water Access Challenges</h3>
          <div className="region-bars">
            <div className="region-bar">
              <div className="region-name">Sub-Saharan Africa</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '75%' }}></div>
              </div>
              <div className="bar-value">75%</div>
            </div>
            <div className="region-bar">
              <div className="region-name">South Asia</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '60%' }}></div>
              </div>
              <div className="bar-value">60%</div>
            </div>
            <div className="region-bar">
              <div className="region-name">East Asia & Pacific</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '45%' }}></div>
              </div>
              <div className="bar-value">45%</div>
            </div>
            <div className="region-bar">
              <div className="region-name">Middle East & North Africa</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '55%' }}></div>
              </div>
              <div className="bar-value">55%</div>
            </div>
            <div className="region-bar">
              <div className="region-name">Latin America & Caribbean</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '30%' }}></div>
              </div>
              <div className="bar-value">30%</div>
            </div>
            <div className="region-bar">
              <div className="region-name">Europe & Central Asia</div>
              <div className="bar-container">
                <div className="bar" style={{ width: '15%' }}></div>
              </div>
              <div className="bar-value">15%</div>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
            Percentage of population without access to safely managed drinking water services
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
