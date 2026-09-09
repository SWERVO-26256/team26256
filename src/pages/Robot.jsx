import React from 'react';

function Robot() {
  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>System Architecture</h2>
        <p>Iteration history and mechanical subsystem breakdown for FTC 26256.</p>
      </div>

      <div className="robot-hero" style={{
        margin: '0 0 32px 0',
        padding: '60px 24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(11, 18, 32, 0.95) 100%)',
        border: '1px solid var(--border-dark)',
        textAlign: 'center'
      }}>
        <div className="robot-hero-img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🤖</div>
          <h3 style={{ color: 'var(--accent-blue)', margin: '0 0 8px 0' }}>SWERVO Drivetrain & Assembly</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '500px' }}>Full 3D CAD render and chassis specs will be revealed prior to our first official competition kickoff.</p>
        </div>
      </div>

      <h3 className="section-title">Subsystems</h3>
      <div className="grid grid-3">
        <div className="card">
          <h4>Mecanum Drivetrain</h4>
          <p>Custom machined chassis with 14:1 gear ratio for optimal acceleration and field traversal speed.</p>
        </div>
        <div className="card">
          <h4>Active Intake</h4>
          <p>Compliant wheel system capable of rapid pixel and hex acquisition from any orientation.</p>
        </div>
        <div className="card">
          <h4>Scoring Mechanism</h4>
          <p>Linear slide elevator utilizing a virtual four-bar linkage to deposit elements efficiently.</p>
        </div>
      </div>
    </section>
  );
}

export default Robot;
