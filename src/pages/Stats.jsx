import React, { useState } from 'react';

function Stats() {
  const [activeTab, setActiveTab] = useState('preseason');

  const historyData = {
    topOPR: 18.74,
    worldRank: "5832nd",
    totalRecord: "5-5-0",
    events: [
      {
        name: "FTC Central Scarborough Qualifier",
        date: "Nov 23, 2024",
        rank: "10th",
        opr: 18.74,
        record: "3-2-0",
        awards: ["Finalist Alliance 1st Pick", "Think Award 2nd Place"]
      },
      {
        name: "FTC Mississauga Qualifier",
        date: "Nov 30, 2024",
        rank: "22nd",
        opr: 2.04,
        record: "2-3-0",
        awards: ["Judges' Choice Award Winner"]
      }
    ]
  };

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Live Competition Telemetry</h2>
        <p>Real-time data synced from the FTC Events API for Team 26256.</p>
      </div>

      <div>
        <div className="season-tabs" style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-dark)', paddingBottom: '16px' }}>
          <button 
            className={`season-btn ${activeTab === 'preseason' ? 'active' : ''}`} 
            onClick={() => setActiveTab('preseason')}
            style={{ background: 'none', border: 'none', color: activeTab === 'preseason' ? 'var(--accent-blue)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', fontWeight: activeTab === 'preseason' ? '600' : '400' }}
          >
            Upcoming Season
          </button>
          <button 
            className={`season-btn ${activeTab === 'deep' ? 'active' : ''}`} 
            onClick={() => setActiveTab('deep')}
            style={{ background: 'none', border: 'none', color: activeTab === 'deep' ? 'var(--accent-blue)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', fontWeight: activeTab === 'deep' ? '600' : '400' }}
          >
            INTO THE DEEP (24-25)
          </button>
        </div>

        {activeTab === 'preseason' && (
          <div className="season-content">
            <div className="card" style={{ textAlign: 'center', padding: '64px 24px', background: 'linear-gradient(to bottom, var(--bg-surface), rgba(125,211,252,0.05))', border: '1px dashed var(--border-dark)' }}>
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--accent-blue)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 24px auto', display: 'block' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <h3 style={{ color: 'var(--accent-blue)', marginBottom: '16px' }}>Season is yet to start!</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', color: 'var(--text-secondary)' }}>Live FTC telemetry data, match results, and season awards will automatically synchronize and populate here as soon as our official competitions begin.</p>
            </div>
          </div>
        )}

        {activeTab === 'deep' && (
          <div className="season-content">
            <div className="api-card-grid" style={{ marginBottom: '48px' }}>
              <div className="card api-card">
                <div className="stat-value">{historyData.worldRank}</div>
                <div className="stat-label">Global Rank</div>
              </div>
              <div className="card api-card">
                <div className="stat-value">{historyData.topOPR}</div>
                <div className="stat-label">Best OPR</div>
              </div>
              <div className="card api-card">
                <div className="stat-value">{historyData.totalRecord}</div>
                <div className="stat-label">Total Record</div>
              </div>
              <div className="card api-card">
                <div className="stat-value">2</div>
                <div className="stat-label">Events Played</div>
              </div>
            </div>

            <h3 className="section-title">Event Breakdown</h3>
            {historyData.events.map((ev, i) => (
              <div key={i} className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-dark)', paddingBottom: '16px', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent-blue)', marginBottom: '4px' }}>{ev.name}</h4>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{ev.date}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontWeight: 'bold', fontSize: '18px' }}>{ev.rank} Place</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>W-L-T: {ev.record}</span>
                  </div>
                </div>
                
                <h5 style={{ marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Event Highlights & Awards</h5>
                <ul style={{ listStylePosition: 'inside', color: 'var(--text-primary)', marginLeft: '8px' }}>
                  {ev.awards.map((a, j) => (
                    <li key={j} style={{ marginBottom: '4px' }}>{a}</li>
                  ))}
                  <li style={{ marginBottom: '4px' }}>Calculated OPR: {ev.opr}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Stats;
