import React, { useState, useEffect } from 'react';

function Sponsors() {
  const [tiers, setTiers] = useState({ diamond: [], gold: [], silver: [], bronze: [] });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/sponsors.json')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setTiers(data))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Corporate Partners</h2>
        <p>Our work is made possible by these incredible sponsors and members of the community.</p>
      </div>

      <div>
        {error ? (
          <div className="card"><p style={{ color: '#EF4444' }}>Failed to load sponsors.json. Add your sponsors there.</p></div>
        ) : (
          <>
            {tiers.diamond?.length > 0 && (
              <div className="tier diamond-tier">
                <h3 className="diamond-text">Diamond Sponsors</h3>
                <div className="grid grid-2">
                  {tiers.diamond.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="card sponsor-card diamond-card">
                      <img src={s.logo} alt={s.name} className="sponsor-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
                      <span className="marquee-fallback" style={{ display: 'none', color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>{s.name}</span>
                      <p className="sponsor-bio">{s.bio}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {['gold', 'silver', 'bronze'].map(tierLevel => (
              tiers[tierLevel]?.length > 0 && (
                <div key={tierLevel} className={`tier ${tierLevel}-tier`}>
                  <h3 className={`${tierLevel}-text`} style={{ textTransform: 'capitalize' }}>{tierLevel} Sponsors</h3>
                  <div className="grid grid-3">
                    {tiers[tierLevel].map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="card sponsor-card">
                        <img src={s.logo} alt={s.name} className="sponsor-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
                        <span className="marquee-fallback" style={{ display: 'none', color: 'var(--text-primary)', fontWeight: '600' }}>{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>

      <div className="cta-banner card">
        <h3>Support the next generation of engineers</h3>
        <p>Your sponsorship provides raw materials, registration fees, and educational resources crucial for our competitive season.</p>
        <a href="/assets/docs/sponsorship-packet.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Download Sponsor Packet (.pdf)</a>
      </div>
    </section>
  );
}

export default Sponsors;
