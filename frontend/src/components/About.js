import React from 'react';
import './About.css';

const About = () => {
  const sdgGoals = [
    {
      icon: 'fas fa-tint',
      title: 'Clean Water & Sanitation',
      description: 'Ensure availability and sustainable management of water and sanitation for all by 2030.'
    },
    {
      icon: 'fas fa-users',
      title: 'Universal Access',
      description: 'Provide universal access to safe and affordable drinking water for all people.'
    },
    {
      icon: 'fas fa-recycle',
      title: 'Sustainable Management',
      description: 'Implement integrated water resources management at all levels.'
    },
    {
      icon: 'fas fa-seedling',
      title: 'Ecosystem Protection',
      description: 'Protect and restore water-related ecosystems including mountains, forests, and wetlands.'
    },
    {
      icon: 'fas fa-hand-holding-water',
      title: 'Water Quality',
      description: 'Substantially increase water quality by reducing pollution and minimizing dumping.'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'International Cooperation',
      description: 'Support developing countries in water and sanitation management and development.'
    }
  ];

  return (
    <div className="about">
      {/* About Hero */}
      <section className="about-hero">
        <div className="section-header">
          <h1>About <span className="highlight">SDG 6</span></h1>
          <p>Understanding the global water crisis and our collective responsibility</p>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <div className="container">
          <div className="section-header">
            <h2>The Six Targets of SDG 6</h2>
            <p>By 2030, we must achieve these ambitious but essential goals</p>
          </div>

          <div className="goals-grid">
            {sdgGoals.map((goal, index) => (
              <div key={index} className="goal-card">
                <div className="goal-icon">
                  <i className={goal.icon}></i>
                </div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-content">
            <div className="impact-text">
              <h2>The Global Water Crisis</h2>
              <p>
                Water scarcity affects more than 40% of the world's population and is projected to rise.
                Climate change, population growth, and pollution are exacerbating this crisis, making
                SDG 6 more critical than ever.
              </p>
              <p>
                Every day, 829,000 people die from diarrhea-related diseases caused by unsafe water,
                poor sanitation, and inadequate hygiene. Women and girls spend 200 million hours
                daily collecting water instead of working, studying, or caring for their families.
              </p>
            </div>

            <div className="impact-visual">
              <div className="impact-stats">
                <div className="impact-stat">
                  <div className="stat-number">2.2B</div>
                  <div className="stat-label">People lack safely managed drinking water</div>
                </div>
                <div className="impact-stat">
                  <div className="stat-number">4.2B</div>
                  <div className="stat-label">People lack safely managed sanitation</div>
                </div>
                <div className="impact-stat">
                  <div className="stat-number">3B</div>
                  <div className="stat-label">People lack basic handwashing facilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
