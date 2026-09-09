import React from 'react';

function Sponsors() {
  return (
    <section className="page fade-in" style={{ display: 'block', paddingBottom: '60px', width: '100%' }}>
      
      {/* Outer Centered Wrapper */}
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        
        {/* Presenting Title Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '24px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.12), rgba(56, 189, 248, 0.04))',
            border: '1px solid rgba(125, 211, 252, 0.35)',
            color: 'var(--accent-blue)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            boxShadow: '0 0 24px rgba(125, 211, 252, 0.15)'
          }}>
            Presenting Title Partner
          </span>
        </div>

        {/* Page Title & Subtitle Header */}
        <div style={{ maxWidth: '750px', margin: '0 auto 40px auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            lineHeight: 1.15
          }}>
            SaugaHacks
          </h2>
          <p style={{ margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#D1D5DB', lineHeight: 1.6 }}>
            The premier high school hackathon initiative developed by <strong>FTC Team 26256 (SWERVO)</strong> to fund and power our competitive robotics operations for the <strong>2026–2027 season</strong>.
          </p>
        </div>

        {/* Hero Spotlight Card */}
        <div className="card" style={{
          position: 'relative',
          width: '100%',
          margin: '0 auto 48px auto',
          padding: 'clamp(28px, 5vw, 48px)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(11, 18, 32, 0.98) 100%)',
          border: '1px solid rgba(125, 211, 252, 0.25)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(125, 211, 252, 0.08)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Subtle Glow backdrop effect */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(125,211,252,0.12) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
            
            {/* SaugaHacks Logo Container */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: '16px clamp(20px, 4vw, 36px)',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              <img 
                src="/assets/sponsors/Saugahacks_Logo.png" 
                alt="SaugaHacks Logo" 
                style={{ 
                  maxHeight: '70px', 
                  maxWidth: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                }} 
              />
            </div>

            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#FFFFFF', margin: 0, fontWeight: 700, lineHeight: 1.25 }}>
              Fueling Innovation, Code, & FTC Robotics
            </h3>

            <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#9CA3AF', maxWidth: '750px', margin: 0, lineHeight: 1.7 }}>
              SaugaHacks is a student-led hackathon created by Team 26256 to bring together tech enthusiasts, developers, and creators. Every registration, partnership, and sponsor contribution associated with SaugaHacks goes directly towards funding our FTC team’s 2026–2027 competitive season—covering robot parts, CNC manufacturing materials, precision sensors, registration fees, and tournament travel.
            </p>

            {/* Exactly One Single CTA Button */}
            <div style={{ marginTop: '12px' }}>
              <a 
                href="https://saugahacks.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{
                  padding: '14px 36px',
                  fontSize: '1.05rem',
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

        {/* 3 Impact Pillars Grid (Premium styling with SVG icons) */}
        <div style={{ width: '100%' }}>
          <h3 style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: '28px', fontSize: '1.4rem', fontWeight: 700 }}>
            Why SaugaHacks Powers Team 26256
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            width: '100%'
          }}>
            
            {/* Pillar 1 */}
            <div className="card" style={{ 
              padding: '24px 20px', 
              background: 'rgba(17, 24, 39, 0.65)', 
              border: '1px solid var(--border-dark)',
              textAlign: 'left',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'rgba(125, 211, 252, 0.1)',
                border: '1px solid rgba(125, 211, 252, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: 'var(--accent-blue)',
                marginBottom: '16px'
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '1.1rem' }}>2026–2027 Season Funding</h4>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                All net proceeds directly support hardware machining, swerve drive modules, high-torque servos, and travel budgets for FTC Team 26256.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="card" style={{ 
              padding: '24px 20px', 
              background: 'rgba(17, 24, 39, 0.65)', 
              border: '1px solid var(--border-dark)',
              textAlign: 'left',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'rgba(125, 211, 252, 0.1)',
                border: '1px solid rgba(125, 211, 252, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: 'var(--accent-blue)',
                marginBottom: '16px'
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '1.1rem' }}>Student-Built Infrastructure</h4>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                Organized, built, and executed by our team members, demonstrating real-world software engineering, event planning, and management skills.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="card" style={{ 
              padding: '24px 20px', 
              background: 'rgba(17, 24, 39, 0.65)', 
              border: '1px solid var(--border-dark)',
              textAlign: 'left',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'rgba(125, 211, 252, 0.1)',
                border: '1px solid rgba(125, 211, 252, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: 'var(--accent-blue)',
                marginBottom: '16px'
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '1.1rem' }}>Community Tech Leadership</h4>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                Empowering high school hackers to build projects from scratch while establishing sustainable funding pathways for competitive robotics.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Sponsors;
