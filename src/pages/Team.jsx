import React, { useState, useEffect } from 'react';

function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/team-members.json')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Could not load team-members.json", err));
  }, []);

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>The Engineers</h2>
        <p>Structured operations and dedicated subteams driving the project forward.</p>
      </div>

      <div className="grid grid-3">
        {members.map((m, i) => (
          <div key={i} className="card team-card">
            <div className="team-photo-container">
              <img 
                src={m.image || '/assets/team/placeholder.jpg'} 
                alt={m.name} 
                className="team-photo" 
                onError={(e) => { e.target.onerror = null; e.target.parentElement.style.display = 'none'; }} 
              />
            </div>
            <div className="team-card-header">
              <h4>{m.name}</h4>
              <span className="team-role">{m.title}</span>
            </div>
            <span className="team-subteam">Grade: {m.grade}</span>
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
