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

          // 1. Executive Allocation
          if (nameLower.includes("heth") || roleLower.includes("captain")) {
            captain = { ...memberData, role: "Team Captain" };
          } else if (nameLower.includes("allison") || roleLower.includes("business")) {
            business = { ...memberData, role: "Business & Media Lead" };
          }
          
          // 2. CAD Subteam Sorting
          else if (roleLower.includes("cad")) {
            if (roleLower.endsWith("lead")) cadLead = memberData;
            else cadMembers.push(memberData);
          }
          
          // 3. Build Subteam Sorting
          else if (roleLower.includes("build") || roleLower.includes("driver")) {
            if (roleLower.endsWith("lead")) buildLeads.push(memberData;
            else buildMembersRaw.push(memberData);
          }
          
          // 4. Software Subteam Sorting
          else if (roleLower.includes("software") || roleLower.includes("program")) {
            if (roleLower.endsWith("lead")) softwareLead = memberData;
            else softwareMembers.push(memberData);
          }
        });

        const buildLead1 = buildLeads[0] || null;
        const buildLead2 = buildLeads[1] || null;

        // Allocate exactly 4 members to Alpha and 2 members to Beta
        const buildMembers1 = buildMembersRaw.slice(0, 4);
        const buildMembers2 = buildMembersRaw.slice(4);

        setRoster({
          captain, business, cadLead, cadMembers,
          buildLead1, buildLead2, buildMembers1, buildMembers2,
          softwareLead, softwareMembers
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error formatting horizontal layout matrix:", err);
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
          minWidth: '180px',
          flexSnapAlign: 'start'
        }}
      >
        <div style={{ 
          position: 'relative', width: '65px', height: '65px', borderRadius: '50%', 
          backgroundColor: '#2A2A2A', border: `2px solid ${color}`,
          marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
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

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Processing roster nodes...</p>
      </section>
    );
  }

  // Helper template to structure horizontal section tracks beautifully
  const renderHorizontalRow = (title, color, leadComponent, membersArray) => (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ fontSize: '1.2rem', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600' }}>
        {title}
      </h3>
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        overflowX: 'auto', 
        paddingBottom: '8px',
        scrollSnapType: 'x mandatory'
      }}>
        {leadComponent && renderMemberCard(leadComponent, color, true)}
        {membersArray.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, color)}</React.Fragment>)}
      </div>
    </div>
  );

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          SWERVO 26256 Engineering Rows
        </p>
      </div>

      {/* Row 1: Executive Board Track */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', color: colors.captain, borderBottom: `2px solid ${colors.captain}`, paddingBottom: '6px', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase' }}>
          💼 Command & Operations
        </h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          {renderMemberCard(roster.captain, colors.captain, true)}
          {renderMemberCard(roster.business, colors.business, true)}
        </div>
      </div>

      {/* Row 2: CAD Lineup */}
      {renderHorizontalRow("📐 CAD Design", colors.cad, roster.cadLead, roster.cadMembers)}

      {/* Row 3: Build Team Alpha Lineup */}
      {renderHorizontalRow("🔧 Build Team Alpha", colors.build, roster.buildLead1, roster.buildMembers1)}

      {/* Row 4: Build Team Beta Lineup */}
      {renderHorizontalRow("🔧 Build Team Beta", colors.build, roster.buildLead2, roster.buildMembers2)}

      {/* Row 5: Autonomous Software Lineup */}
      {renderHorizontalRow("💻 Programming", colors.software, roster.softwareLead, roster.softwareMembers)}

    </section>
  );
}

export default Team;
