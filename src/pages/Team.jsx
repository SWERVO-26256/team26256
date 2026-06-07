import React, { useState, useEffect } from 'react';

function Team() {
  const [roster, setRoster] = useState({
    captain: null,
    business: null,
    mentor: null,
    cadLead: null,
    cadMembers: [],
    buildLeads: [],
    buildMembers: [],
    softwareLead: null,
    softwareMembers: []
  });
  const [loading, setLoading] = useState(true);

  const colors = {
    captain: "#FFB020",      
    business: "#E040FB",     
    mentor: "#00E676",       
    cad: "#00E5FF",          
    build: "#FF3D00",        
    software: "#00FF66"      
  };

  useEffect(() => {
    fetch('/team-members.json')
      .then((res) => res.json())
      .then((data) => {
        let captain = null;
        let business = null;
        let mentor = null;
        let cadLead = null;
        const cadMembers = [];
        const buildLeads = [];
        const buildMembers = [];
        let softwareLead = null;
        const softwareMembers = [];

        data.forEach(member => {
          const nameLower = member.name.toLowerCase();
          const titleLower = (member.title || "").toLowerCase().trim();

          const memberData = {
            name: member.name,
            img: member.image ? `/${member.image.replace(/^\//, '')}` : "",
            role: member.title || "Team Member"
          };

          // Executive Administration Row
          if (nameLower.includes("heth")) {
            captain = { ...memberData, role: "Captain" };
          } else if (nameLower.includes("allison")) {
            business = { ...memberData, role: "Business Team" };
          } else if (titleLower.includes("mentor") || titleLower.includes("advisor")) {
            mentor = { ...memberData, role: "Team Mentor" };
          }
          
          // CAD Row
          else if (titleLower.includes("cad")) {
            if (titleLower.includes("lead")) cadLead = memberData;
            else cadMembers.push(memberData);
          }
          
          // Software Row
          else if (titleLower.includes("software")) {
            if (titleLower.includes("lead")) softwareLead = memberData;
            else softwareMembers.push(memberData);
          }

          // Build Row
          else if (titleLower.includes("build")) {
            if (titleLower.includes("lead")) {
              buildLeads.push({ ...memberData, role: "Co-Build Lead" });
            } else {
              buildMembers.push(memberData);
            }
          }
        });

        setRoster({
          captain, business, mentor, cadLead, cadMembers,
          buildLeads, buildMembers,
          softwareLead, softwareMembers
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error formatting roster configuration:", err);
        setLoading(false);
      });
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  const renderMemberCard = (member, color, isLead = false) => {
    if (!member) return null;
    
    // Explicitly hide the lead badge for Captain and Business cards
    const displayLeadBadge = isLead && member.role !== "Captain" && member.role !== "Business Team";

    return (
      <div 
        className="card" 
        style={{ 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: `4px solid ${color}`,
          width: '100%' 
        }}
      >
        <div style={{ 
          position: 'relative', width: '65px', height: '65px', borderRadius: '50%', 
          backgroundColor: '#2A2A2A', border: `2px solid ${color}`,
          marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text-main)' }}>
            {getInitials(member.name)}
          </span>
          {member.img && (
            <img 
              src={member.img} 
              alt={member.name} 
              onError={handleImageError}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          )}
        </div>
        <h4 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '600' }}>{member.name}</h4>
        {displayLeadBadge && (
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: color, fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>
            ★ LEAD
          </span>
        )}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>
          {member.role}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Finalizing clean interface matrices...</p>
      </section>
    );
  }

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          SWERVO 26256 Roster
        </p>
      </div>

      {/* Row 1: Executive Board */}
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: colors.captain, borderBottom: `2px solid ${colors.captain}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600', textTransform: 'uppercase' }}>
          💼 Executive Administration
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {renderMemberCard(roster.captain, colors.captain, true)}
          {renderMemberCard(roster.business, colors.business, true)}
          {roster.mentor && renderMemberCard(roster.mentor, colors.mentor, true)}
        </div>
      </div>

      {/* Row 2: CAD Design */}
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: colors.cad, borderBottom: `2px solid ${colors.cad}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600' }}>
          📐 CAD Design
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {renderMemberCard(roster.cadLead, colors.cad, true)}
          {roster.cadMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.cad)}</React.Fragment>)}
        </div>
      </div>

      {/* Row 3: Unified Build Team Row */}
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: colors.build, borderBottom: `2px solid ${colors.build}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600' }}>
          🔧 Build Team Operations
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Management Stack Column on Left side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roster.buildLeads.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.build, true)}</React.Fragment>)}
          </div>
          
          {/* Members Workspace spreading on Right side */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '16px',
            flexGrow: 2
          }}>
            {roster.buildMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.build)}</React.Fragment>)}
          </div>
        </div>
      </div>

      {/* Row 4: Autonomous Programming */}
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: colors.software, borderBottom: `2px solid ${colors.software}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600' }}>
          💻 Programming
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {renderMemberCard(roster.softwareLead, colors.software, true)}
          {roster.softwareMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.software)}</React.Fragment>)}
        </div>
      </div>

    </section>
  );
}

export default Team;