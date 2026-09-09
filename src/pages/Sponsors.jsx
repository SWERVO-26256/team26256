import React from 'react';

function Sponsors() {
  return (
    <section className="page fade-in" style={{ display: 'block', paddingBottom: '60px' }}>
      
      {/* Top Banner Tag */}
      <div style={{ textAlign: 'center', marginTop: '12px', marginBottom: '24px' }}>
        <span style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.15), rgba(56, 189, 248, 0.05))',
          border: '1px solid rgba(125, 211, 252, 0.4)',
          color: 'var(--accent-blue)',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(125, 211, 252, 0.2)'
        }}>
          Presenting Title Partner
        </span>
      </div>

      {/* Main Title Hero Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 800, 
          letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          SaugaHacks
        </h2>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', color: '#D1D5DB', lineHeight: 1.6 }}>
          The premier high school hackathon initiative developed by <strong>FTC Team 26256 (SWERVO)</strong> to fund and power our competitive robotics operations for the <strong>2026–2027 season</strong>.
        </p>
      </div>

      {/* Massive Title Sponsor Spotlight Card */}
      <div className="card" style={{
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto 48px',
        padding: 'clamp(32px, 5vw, 56px)',
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(11, 18, 32, 0.98) 100%)',
        border: '1px solid rgba(125, 211, 252, 0.3)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(125, 211, 252, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop effect */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(125,211,252,0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center',
            padding: '16px 32px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '1px' }}>
              SAUGA<span style={{ color: 'var(--accent-blue)' }}>HACKS</span>
            </span>
          </div>

          <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', margin: 0, fontWeight: 700 }}>
            Fueling Innovation, Code, & FTC Robotics
          </h3>

          <p style={{ fontSize: '1.1rem', color: '#9CA3AF', maxWidth: '800px', margin: 0, lineHeight: 1.7 }}>
            SaugaHacks is a student-led hackathon created by Team 26256 to bring together tech enthusiasts, developers, and creators from across the region. Every registration, partnership, and sponsor contribution associated with SaugaHacks goes directly towards funding our FTC team’s 2026–2027 competitive season—covering robot parts, CNC manufacturing materials, precision sensors, registration fees, and tournament travel.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
            <a 
              href="https://saugahacks.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{
                padding: '14px 32px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(125, 211, 252, 0.3)'
              }}
            >
              Visit SaugaHacks.org &rarr;
            </a>
            
            <a 
              href="https://saugahacks.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px'
              }}
            >
              Register / Learn More
            </a>
          </div>

        </div>
      </div>

      {/* 3 Impact Pillars Grid */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: '32px', fontSize: '1.5rem' }}>
          Why SaugaHacks Matters To Team 26256
        </h3>

        <div className="grid grid-3">
          
          <div className="card" style={{ padding: '28px 24px', background: 'rgba(17, 24, 39, 0.7)', border: '1px solid var(--border-dark)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚙️</div>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>2026–2027 Season Funding</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              All net proceeds directly support hardware machining, swerve drive modules, high-torque servos, and travel budgets for FTC Team 26256.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 24px', background: 'rgba(17, 24, 39, 0.7)', border: '1px solid var(--border-dark)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚀</div>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Student-Built Infrastructure</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              Organized, built, and executed by our team members, demonstrating real-world software engineering, event planning, and management skills.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 24px', background: 'rgba(17, 24, 39, 0.7)', border: '1px solid var(--border-dark)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌐</div>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Community Tech Leadership</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              Empowering hundreds of high school hackers to build projects from scratch while establishing sustainable funding pathways for competitive robotics.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Sponsors;
