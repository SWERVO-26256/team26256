import React from 'react';

function Robot() {
  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>System Architecture</h2>
        <p>Iteration history and mechanical subsystem breakdown.</p>
      </div>

      <div className="robot-hero">
        <div className="robot-hero-img">
          <span>[ Drop full robot image in assets/robot ]</span>
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
