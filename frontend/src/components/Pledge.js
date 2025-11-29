import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { pledgesAPI } from '../services/api';
import './Pledge.css';

const Pledge = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    pledges: [],
    isAnonymous: false
  });

  const [stats, setStats] = useState({
    totalPledges: 1247,
    totalWaterSaved: 2500000
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await pledgesAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Keep default stats if API fails
    }
  };

  const pledgeOptions = [
    {
      id: 'shorter-showers',
      label: 'Take shorter showers (5 minutes or less)',
      icon: 'fas fa-shower',
      savings: '40L per shower'
    },
    {
      id: 'fix-leaks',
      label: 'Fix leaky faucets and toilets',
      icon: 'fas fa-wrench',
      savings: '750L per day'
    },
    {
      id: 'full-loads',
      label: 'Run full loads in dishwasher and washing machine',
      icon: 'fas fa-utensils',
      savings: '20-60L per load'
    },
    {
      id: 'turn-off-tap',
      label: 'Turn off tap while brushing teeth or washing dishes',
      icon: 'fas fa-faucet',
      savings: '24L per day'
    },
    {
      id: 'rainwater',
      label: 'Collect rainwater for outdoor use',
      icon: 'fas fa-cloud-rain',
      savings: '5,000L per year'
    },
    {
      id: 'spread-awareness',
      label: 'Share water-saving tips with others',
      icon: 'fas fa-users',
      savings: 'Community impact'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePledgeChange = (pledgeId) => {
    setFormData(prev => ({
      ...prev,
      pledges: prev.pledges.includes(pledgeId)
        ? prev.pledges.filter(id => id !== pledgeId)
        : [...prev.pledges, pledgeId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.pledges.length === 0) {
      setError('Please select at least one pledge');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email');
      return;
    }

    setLoading(true);

    try {
      const pledgeData = {
        ...formData,
        name: formData.isAnonymous ? 'Anonymous' : formData.name
      };

      await pledgesAPI.create(pledgeData);
      setShowModal(true);

      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        pledges: [],
        isAnonymous: false
      });

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit pledge');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const shareOnSocial = (platform) => {
    const text = "I just pledged to save water for SDG 6! Join me in the fight for clean water and sanitation. #SDG6 #WaterConservation";
    const url = window.location.origin;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="pledge">
      <div className="container">
        <div className="pledge-container">
          <div className="pledge-form-container">
            <div className="section-header">
              <h1>Take the <span className="highlight">Water Pledge</span></h1>
              <p>Make a commitment to save water and join the global movement for SDG 6</p>
            </div>

            <form onSubmit={handleSubmit} className="pledge-form">
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Make this pledge anonymously
                </label>
              </div>

              <div className="pledge-options">
                <label>Select your pledges:</label>
                {pledgeOptions.map(option => (
                  <label key={option.id} className="pledge-option">
                    <input
                      type="checkbox"
                      checked={formData.pledges.includes(option.id)}
                      onChange={() => handlePledgeChange(option.id)}
                    />
                    <span className="checkmark"></span>
                    <span className="pledge-text">
                      <i className={option.icon}></i>
                      {option.label}
                      <small>Save: {option.savings}</small>
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting Pledge...
                  </>
                ) : (
                  <>
                    <i className="fas fa-hand-holding-water"></i>
                    Take the Pledge
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pledge-stats">
            <div className="pledge-counter">
              <div className="counter-number">{stats.totalPledges.toLocaleString()}</div>
              <p>People have already taken the pledge</p>
            </div>

            <div className="pledge-impact">
              <h4>Our Collective Impact</h4>
              <div className="impact-item">
                <i className="fas fa-tint"></i>
                <span>{stats.totalWaterSaved.toLocaleString()} liters saved monthly</span>
              </div>
              <div className="impact-item">
                <i className="fas fa-tree"></i>
                <span>Equivalent to saving {Math.round(stats.totalWaterSaved / 150000)} Olympic swimming pools</span>
              </div>
              <div className="impact-item">
                <i className="fas fa-home"></i>
                <span>Enough water for {Math.round(stats.totalWaterSaved / 200)} households for a month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Thank You for Your Pledge!</h3>
            <p>
              Your commitment to water conservation makes a real difference.
              Together, we can achieve SDG 6 and ensure clean water for all.
            </p>

            <div className="modal-share">
              <p>Share your pledge with others:</p>
              <div className="share-buttons">
                <button
                  className="share-btn facebook"
                  onClick={() => shareOnSocial('facebook')}
                >
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  className="share-btn twitter"
                  onClick={() => shareOnSocial('twitter')}
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="share-btn whatsapp"
                  onClick={() => shareOnSocial('whatsapp')}
                >
                  <i className="fab fa-whatsapp"></i>
                </button>
              </div>
            </div>

            <button className="btn btn-primary" onClick={closeModal}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pledge;
