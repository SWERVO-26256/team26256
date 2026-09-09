import React from 'react';

function Sponsors() {
  return (
    <section className="page fade-in" style={{ display: 'block', paddingBottom: '40px', width: '100%' }}>
      
      {/* Outer Centered Container */}
      <div style={{ maxWidth: '1050px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Single Outer Showcase Container (No Inner Double Boxes) */}
        <div style={{
          position: 'relative',
          width: '100%',
          padding: 'clamp(24px, 5vw, 48px)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(11, 18, 32, 0.98) 100%)',
          border: '1px solid rgba(125, 211, 252, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(125, 211, 252, 0.08)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          
          {/* Ambient Wireframe Glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            width: '240px',
            height: '240px',
            background: 'var(--accent-blue)',
            filter: 'blur(100px)',
            opacity: 0.12,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            alignItems: 'center'
          }}>
            
            {/* Left Column: Circular Glowing Logo (Same Style as Homepage Hero Logo) */}
            <div style={{
              display: 'flex',
              justify: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '260px',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                {/* Outer Glow Ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.4) 0%, rgba(56, 189, 248, 0.1) 100%)',
                  filter: 'blur(12px)',
                  opacity: 0.8
                }}></div>

                {/* Circular Image Container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(125, 211, 252, 0.3)',
                  boxShadow: '0 0 50px rgba(125, 211, 252, 0.18)',
                  background: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}>
                  <img 
                    src="/assets/sponsors/Saugahacks_Logo.png" 
                    alt="SaugaHacks Logo" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '50%',
                      display: 'block'
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Direct Explanation Content & Single CTA */}
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                Sponsored by
              </span>

              <h2 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 14px 0',
                lineHeight: 1.1,
                letterSpacing: '-0.5px'
              }}>
                SaugaHacks
              </h2>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                color: '#D1D5DB',
                lineHeight: 1.65,
                margin: '0 0 24px 0'
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
                  padding: '13px 32px',
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
