import React from 'react';

function Sponsors() {
  return (
    <section className="page fade-in" style={{ display: 'block', paddingBottom: '40px', width: '100%' }}>
      
      {/* Outer Container */}
      <div style={{ maxWidth: '1050px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Compact 2-Column Showcase Box */}
        <div className="card" style={{
          position: 'relative',
          width: '100%',
          padding: 'clamp(24px, 4vw, 40px)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(11, 18, 32, 0.98) 100%)',
          border: '1px solid rgba(125, 211, 252, 0.25)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(125, 211, 252, 0.08)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          
          {/* Subtle Ambient Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(125,211,252,0.12) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(24px, 4vw, 40px)',
            alignItems: 'center'
          }}>
            
            {/* Left Column: Logo Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              padding: 'clamp(24px, 4vw, 36px)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              minHeight: '260px',
              boxSizing: 'border-box',
              textAlign: 'center'
            }}>
              <img 
                src="/assets/sponsors/Saugahacks_Logo.png" 
                alt="SaugaHacks Logo" 
                style={{ 
                  maxHeight: '110px', 
                  maxWidth: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))',
                  display: 'block',
                  margin: '0 auto'
                }} 
              />
            </div>

            {/* Right Column: Explanation & Single CTA Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              
              {/* Sponsored By Badge */}
              <span style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.12), rgba(56, 189, 248, 0.04))',
                border: '1px solid rgba(125, 211, 252, 0.35)',
                color: 'var(--accent-blue)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                Sponsored by
              </span>

              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 12px 0',
                lineHeight: 1.15
              }}>
                SaugaHacks
              </h2>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                color: '#D1D5DB',
                lineHeight: 1.65,
                margin: '0 0 20px 0'
              }}>
                SaugaHacks is the premier high school hackathon initiative developed by <strong>FTC Team 26256 (SWERVO)</strong>. Created to bring together young programmers, designers, and innovators, every registration and partnership associated with SaugaHacks directly funds our competitive robotics season—powering our parts, manufacturing, and tournament operations for <strong>2026–2027</strong>.
              </p>

              {/* Single CTA Button */}
              <a 
                href="https://saugahacks.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(125, 211, 252, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                Find out more
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Sponsors;
