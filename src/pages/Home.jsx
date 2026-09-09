import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('/sponsors.json')
      .then(res => res.json())
      .then(data => {
        let allSponsors = [];
        Object.values(data).forEach(tierList => {
          allSponsors = allSponsors.concat(tierList);
        });
        setSponsors(allSponsors);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="page active fade-in" style={{ display: 'block' }}>
      <div className="hero">
        <div className="hero-content">
          <h1>Precision-driven robotics through iterative engineering.</h1>
          <p className="tagline">We are FTC Team 26256. Building advanced mechanical systems and writing structured automation to compete at the highest level of the FIRST Tech Challenge.</p>
          <div className="hero-actions">
            <Link to="/robot" className="btn btn-primary">View Robot Specs</Link>
            <Link to="/sponsors" className="btn btn-secondary">Become a Sponsor</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="logo-hero-container">
            <div className="wireframe-glow" style={{ borderRadius: '50%' }}></div>
            <img
              src="/assets/swervologo.jpg"
              alt="SWERVO 26256 Logo"
              className="logo-hero-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
                display: 'block',
              }}
              onError={(e) => {
                // Fallback: show a placeholder if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.style.background =
                  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
              }}
            />
          </div>
        </div>
      </div>

      <div className="sponsor-marquee-container" style={{ padding: '16px 0', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)', background: 'rgba(17, 24, 39, 0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
            Presenting Title Partner:
          </span>
          <a 
            href="https://saugahacks.org" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#FFFFFF', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              textDecoration: 'none',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            SAUGA<span style={{ color: 'var(--accent-blue)' }}>HACKS</span>
            <span style={{ fontSize: '0.85rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(125, 211, 252, 0.15)', color: 'var(--accent-blue)', border: '1px solid rgba(125, 211, 252, 0.3)' }}>
              saugahacks.org &rarr;
            </span>
          </a>
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat-item">
          <span className="stat-value">2</span>
          <span className="stat-label">24-25 Competitions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">3</span>
          <span className="stat-label">24-25 Awards</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">5-5</span>
          <span className="stat-label">24-25 Record</span>
        </div>
      </div>
    </section>
  );
}

export default Home;