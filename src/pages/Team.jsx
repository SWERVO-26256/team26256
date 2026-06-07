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

          // Executive Classifications
          if (nameLower.includes("heth") || roleLower.includes("captain")) {
            captain = { ...memberData, role: "Team Captain" };
          } else if (nameLower.includes("allison") || roleLower.includes("business")) {
            business = { ...memberData, role: "Business & Media Lead" };
          }
          
          // CAD Subteam
          else if (roleLower.includes("cad")) {
            if (roleLower.endsWith("lead")) cadLead = memberData;
            else cadMembers.push(memberData);
          }
          
          // Build Subteam
          else if (roleLower.includes("build") || roleLower.includes("driver")) {
            if (roleLower.endsWith("lead")) buildLeads.push(memberData);
            else buildMembersRaw.push(memberData);
          }
          
          // Software Subteam
          else if (roleLower.includes("software") || roleLower.includes("program")) {
            if (roleLower.endsWith("lead")) softwareLead = memberData;
            else softwareMembers.push(memberData);
          }
        });

        // Separate build leads
        const buildLead1 = buildLeads[0] || null;
        const buildLead2 = buildLeads[1] || null;

        // Hardcoded Split: First 4 members go to Alpha, remaining 2 go to Beta
        const buildMembers1 = buildMembersRaw.slice(0, 4);
        const buildMembers2 = buildMembersRaw.slice(4, 6);

        setRoster({
          captain, business, cadLead, cadMembers,
          buildLead1, buildLead2, buildMembers1, buildMembers2,
          softwareLead, softwareMembers
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error formatting horizontal rows:", err);
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
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: `4px solid ${color}`,
          minWidth: '180px'
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
        {isLead && (
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

  // Layout wrapper to format row headers and horizontal flex cards cleanly
  const renderHorizontalRow = (title, color, leadComponent, membersArray = []) => {
    return (
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>
          {title}
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto', 
          paddingBottom: '8px',
          flexWrap: 'wrap' // Allows clean wrapping on mobile devices
        }}>
          {leadComponent}
          {membersArray.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, color)}</React.Fragment>)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Arranging structural matrices...</p>
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

      {/* Row 1: Executive Board (Captain & Business Side-by-Side Equaled) */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1.2rem', color: colors.captain, borderBottom: `2px solid ${colors.captain}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase' }}>
          💼 Executive Board
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {renderMemberCard(roster.captain, colors.captain, true)}
          {renderMemberCard(roster.business, colors.business, true)}
        </div>
      </div>

      {/* Row 2: CAD Design */}
      {renderHorizontalRow("📐 CAD Design", colors.cad, renderMemberCard(roster.cadLead, colors.cad, true), roster.cadMembers)}

      {/* Row 3: Build Team Alpha */}
      {renderHorizontalRow("🔧 Build Team Alpha", colors.build, renderMemberCard(roster.buildLead1, colors.build, true), roster.buildMembers1)}

      {/* Row 4: Build Team Beta */}
      {renderHorizontalRow("🔧 Build Team Beta", colors.build, renderMemberCard(roster.buildLead2, colors.build, true), roster.buildMembers2)}

      {/* Row 5: Autonomous Software */}
      {renderHorizontalRow("💻 Programming", colors.software, renderMemberCard(roster.softwareLead, colors.software, true), roster.softwareMembers)}

    </section>
  );
}

export default Team;
