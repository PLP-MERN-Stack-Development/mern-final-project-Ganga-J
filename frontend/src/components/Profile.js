import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { pledgesAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    fetchUserPledges();
  }, []);

  const fetchUserPledges = async () => {
    try {
      const response = await pledgesAPI.getMyPledges();
      setPledges(response.data.pledges);
    } catch (error) {
      console.error('Failed to fetch pledges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await updateProfile(formData);

    if (result.success) {
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } else {
      setError(result.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user?.name || 'User')}
          </div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{pledges.length}</div>
            <div className="stat-label">Total Pledges</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {pledges.reduce((total, pledge) => total + (pledge.waterSaved || 0), 0)}
            </div>
            <div className="stat-label">Liters Saved/Day</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {new Date(user?.createdAt).getFullYear()}
            </div>
            <div className="stat-label">Member Since</div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>Account Information</h3>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                {success}
              </div>
            )}

            {editing ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
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
                    />
                  </div>
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    <i className="fas fa-times"></i>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditing(true)}
                  style={{ marginTop: '20px' }}
                >
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h3>Your Pledges</h3>

            {pledges.length === 0 ? (
              <div className="no-pledges">
                <i className="fas fa-hand-holding-water"></i>
                <p>You haven't made any pledges yet.</p>
                <a href="/pledge" className="btn btn-primary">
                  Make Your First Pledge
                </a>
              </div>
            ) : (
              <div className="pledges-list">
                {pledges.map((pledge) => (
                  <div key={pledge._id} className="pledge-item">
                    <div className="pledge-header">
                      <span className="pledge-date">
                        {new Date(pledge.createdAt).toLocaleDateString()}
                      </span>
                      <span className="pledge-savings">
                        {pledge.waterSaved} L/day saved
                      </span>
                    </div>
                    <div className="pledge-pledges">
                      {pledge.pledges.map((pledgeType, index) => (
                        <span key={index} className="pledge-badge">
                          {pledgeType.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
