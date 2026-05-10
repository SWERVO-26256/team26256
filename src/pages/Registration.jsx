import React from 'react';

function Registration() {
  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="registration-layout">
        <div className="registration-info">
          <h2 className="reg-title">Become a pioneer.</h2>
          <p className="reg-subtitle">We are actively recruiting dedicated engineers, programmers, and business minds for the upcoming FTC season. Join us to push the limits of autonomous control and mechanical precision with SWERVO.</p>
        </div>
        <div className="registration-action">
          <a href="https://docs.google.com/forms/d/1YLtxBYCRaLczJYtgBTkXy5B4dt77lARfTHeARBLtp9M/viewform" target="_blank" rel="noopener noreferrer" className="btn-clean-apply">APPLY NOW</a>
        </div>
      </div>
    </section>
  );
}

export default Registration;
