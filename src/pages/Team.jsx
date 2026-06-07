import React, { useState, useEffect } from 'react';

function Team() {
  const [roster, setRoster] = useState({
    captain: null,
    business: null,
    cadLead: null,
    cadMembers: [],
    buildLead1: null,
    buildLead2: null,
    buildMembers1: [],
    buildMembers2: [],
    softwareLead: null,
    softwareMembers: []
  });
  const [loading, setLoading] = useState(true);

  const colors = {
    captain: "#FFB020",      // Amber Gold
    business: "#E040FB",     // Neon Orchid/Purple
    cad: "#00E5FF",          // Cyan Ice
    build: "#FF3D00",        // Red-Orange
    software: "#00FF66"      // Bright Green
  };

  useEffect(() => {
    fetch('/team-members.json')
      .then((res) => res.json())
      .then((data) => {
        let captain = null;
        let business = null;
        let cadLead = null;
        const cadMembers = [];
        
        const buildLeads = [];
        const buildMembersRaw = [];
        
        let softwareLead = null;
        const softwareMembers = [];

        data.forEach(member => {
          const nameLower = member.name.toLowerCase();
          const roleLower = (member.role || member.title || "").toLowerCase().trim();

          const memberData = {
            name: member.name,
            img: member.image ? `/${member.image.replace(/^\//, '')}` : "",
            role: member.role || member.title || "Team Member"
          };

          // 1. Executive Exceptions (Heth & Allison)
          if (nameLower.includes("heth") || roleLower.includes("captain")) {
            captain = { ...memberData, role: "Team Captain" };
          } else if (nameLower.includes("allison") || roleLower.includes("business")) {
            business = { ...memberData, role: "Business & Media Lead" };
          }
          
          // 2. CAD Subteam Sorting
          else if (roleLower.includes("cad")) {
            if (roleLower.endsWith("lead")) {
              cadLead = memberData;
            } else {
              cadMembers.push(memberData);
            }
          }
          
          // 3. Build Subteam Sorting
          else if (roleLower.includes("build") || roleLower.includes("driver")) {
            if (roleLower.endsWith("lead")) {
              buildLeads.push(memberData);
            } else {
              buildMembersRaw.push(memberData);
            }
          }
          
          // 4. Software / Programming Subteam Sorting
          else if (roleLower.includes("software") || roleLower.includes("program")) {
            if (roleLower.endsWith("lead")) {
              softwareLead = memberData;
            } else {
              softwareMembers.push(memberData);
            }
          }
        });

        // Dynamic allocation for Dual Build Leads
        const buildLead1 = buildLeads[0] || null;
        const buildLead2 = buildLeads[1] || null;

        // Balance the Build members list evenly into Alpha and Beta columns
        const buildMembers1 = [];
        const buildMembers2 = [];
        buildMembersRaw.forEach((m, idx) => {
          if (idx % 2 === 0) {
            buildMembers1.push(m);
          } else {
            buildMembers2.push(m);
          }
        });

        setRoster({
          captain, business, cadLead, cadMembers,
          buildLead1, buildLead2, buildMembers1, buildMembers2,
          softwareLead, softwareMembers
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error dynamically sorting roster roles:", err);
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
    return (
      <div 
        className="card" 
        style={{ 
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: `4px solid ${color}`,
          marginBottom: '16px'
        }}
      >
        <div style={{ 
          position: 'relative', width: '75px', height: '75px', borderRadius: '50%', 
          backgroundColor: '#2A2A2A', border: `2px solid ${color}`,
          marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--text-main)' }}>
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
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '600' }}>{member.name}</h4>
        {isLead && (
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: color, fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
            ★ LEAD
          </span>
        )}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '500', margin: 0 }}>
          {member.role}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Parsing roster matrices...</p>
      </section>
    );
  }

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          SWERVO 26256 Direct Roster
        </p>
      </div>

      {/* Row 1: Executive Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px', 
        maxWidth: '600px', 
        margin: '0 auto 56px auto' 
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.captain, borderBottom: `2px solid ${colors.captain}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase' }}>Command</h3>
          {renderMemberCard(roster.captain, colors.captain, true)}
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.business, borderBottom: `2px solid ${colors.business}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase' }}>Operations</h3>
          {renderMemberCard(roster.business, colors.business, true)}
        </div>
      </div>

      {/* Row 2: 4 Columns Structural Grid System */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* Column 1: CAD DESIGN */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.cad, borderBottom: `2px solid ${colors.cad}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>📐 CAD Design</h3>
          {renderMemberCard(roster.cadLead, colors.cad, true)}
          {roster.cadMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.cad)}</React.Fragment>)}
        </div>

        {/* Column 2: MECHANICAL BUILD A */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.build, borderBottom: `2px solid ${colors.build}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>🔧 Build Team Alpha</h3>
          {renderMemberCard(roster.buildLead1, colors.build, true)}
          {roster.buildMembers1.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.build)}</React.Fragment>)}
        </div>

        {/* Column 3: MECHANICAL BUILD B */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.build, borderBottom: `2px solid ${colors.build}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>🔧 Build Team Beta</h3>
          {renderMemberCard(roster.buildLead2, colors.build, true)}
          {roster.buildMembers2.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.build)}</React.Fragment>)}
        </div>

        {/* Column 4: AUTONOMOUS SOFTWARE */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: colors.software, borderBottom: `2px solid ${colors.software}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>💻 Programming</h3>
          {renderMemberCard(roster.softwareLead, colors.software, true)}
          {roster.softwareMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, colors.software)}</React.Fragment>)}
        </div>

      </div>
    </section>
  );
}

export default Team;
