import React from 'react';

function Robot() {
  return (
    <section className="page fade-in" style={{ display: 'block', width: '100%' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>System Architecture</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 auto' }}>Iteration history and mechanical subsystem breakdown for FTC 26256.</p>
        </div>

        <div className="robot-hero" style={{
          margin: '0 0 40px 0',
          padding: 'clamp(40px, 6vw, 64px) 24px',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.9) 0%, rgba(11, 18, 32, 0.95) 100%)',
          border: '1px solid var(--border-dark)',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          <div className="robot-hero-img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(125, 211, 252, 0.08)',
              border: '1px solid rgba(125, 211, 252, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'var(--accent-blue)',
              marginBottom: '16px'
            }}>
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 style={{ color: 'var(--accent-blue)', margin: '0 0 8px 0', fontSize: '1.4rem' }}>SWERVO Drivetrain & Assembly</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>
              Full 3D CAD renders and chassis subsystem breakdowns will be revealed prior to our first official competition kickoff.
            </p>
          </div>
        </div>

        <h3 className="section-title" style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: '24px', fontSize: '1.4rem' }}>Subsystems</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%',
          textAlign: 'left'
        }}>
          <div className="card" style={{ padding: '24px 20px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Mecanum Drivetrain</h4>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              Custom machined chassis with 14:1 gear ratio for optimal acceleration and field traversal speed.
            </p>
          </div>
          <div className="card" style={{ padding: '24px 20px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Active Intake</h4>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              Compliant wheel system capable of rapid pixel and hex acquisition from any orientation.
            </p>
          </div>
          <div className="card" style={{ padding: '24px 20px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Scoring Mechanism</h4>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              Linear slide elevator utilizing a virtual four-bar linkage to deposit elements efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Robot;
