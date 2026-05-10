import React from 'react';

function Portfolio() {
  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Engineering Portfolio</h2>
        <p>Comprehensive design processes, CAD architecture, and autonomous routing logic.</p>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '250px' }}>
          <div>
            <h3 style={{ color: 'var(--accent-blue)' }}>Season 2025-2026</h3>
            <p style={{ marginTop: '16px' }}>Dive deep into our 15-page submission detailing subsystem iterations, physics math models for our shooter, and community outreach financial breakdowns.</p>
          </div>
          <a href="/assets/docs/engineering-portfolio.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '24px' }}>View Full Portfolio (PDF)</a>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '250px' }}>
          <div>
            <h3 style={{ color: 'var(--text-primary)' }}>Open Source Intelligence</h3>
            <p style={{ marginTop: '16px' }}>We believe in raising the floor for all FTC teams. All of our codebases, vision processing algorithms, and CAD step files are fully open source.</p>
          </div>
          <a href="https://github.com/Hm2shifty/26256-website" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '24px' }}>Visit Our GitHub Data</a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
