import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [counter, setCounter] = useState(0);
  const targetNumber = 2200000000; // 2.2 billion people

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCounter(targetNumber);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Save Water, Save Life</h1>
            <p>
              Join millions in the fight for SDG 6: Clean Water & Sanitation.
              Every drop counts in our mission to ensure safe water for all by 2030.
            </p>
            <div className="hero-buttons">
              <Link to="/pledge" className="btn btn-primary">
                <i className="fas fa-hand-holding-water"></i>
                Take the Pledge
              </Link>
              <Link to="/calculator" className="btn btn-outline">
                <i className="fas fa-calculator"></i>
                Calculate Impact
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="water-drop">
              <div className="drop-inner">
                <div className="counter">{counter.toLocaleString()}</div>
                <p>People worldwide lack access to safe drinking water</p>
              </div>
            </div>
          </div>
        </div>

        <div className="wave-container">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="container">
          <div className="stats-preview">
            <div className="stat-item">
              <div className="stat-number">829,000</div>
              <div className="stat-label">Deaths from water-related diseases daily</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200M</div>
              <div className="stat-label">Hours women spend collecting water daily</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">80%</div>
              <div className="stat-label">Of wastewater returns to ecosystems untreated</div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Every Action Counts</h2>
            <p>
              Small changes in your daily habits can create a ripple effect that reaches millions.
              Start your water-saving journey today.
            </p>
            <div className="cta-buttons">
              <Link to="/tips" className="btn btn-primary">
                <i className="fas fa-lightbulb"></i>
                Water-Saving Tips
              </Link>
              <Link to="/statistics" className="btn btn-secondary">
                <i className="fas fa-chart-bar"></i>
                View Statistics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
