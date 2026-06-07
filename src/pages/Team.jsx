import React, { useState, useEffect } from 'react';

function Team() {
  const [roster, setRoster] = useState({
    captain: null,
    business: null,
    mentor: null,
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

  // 6-color system mapping your exact requested visuals
  const colors = {
    captain: "#FFB020",      // Amber Gold
    business: "#E040FB",     // Neon Purple
    mentor: "#00E676",       // Vibrant Mint Green
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
        let mentor = null;
        let cadLead = null;
        const cadMembers = [];
        
        let buildLead1 = null;
        let buildLead2 = null;
        // Temporary arrays to hold standard build members for a clean split
        const alphaBuildMembers = [];
        const betaBuildMembers = [];
        
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

          // 1. Executive Administration Row (Strict Name Matching from your JSON)
          if (nameLower.includes("heth")) {
            captain = { ...memberData, role: "Team Captain" };
          } else if (nameLower.includes("allison")) {
            business = { ...memberData, role: "Business Team Lead" };
          } else if (titleLower.includes("mentor") || titleLower.includes("advisor")) {
            mentor = { ...memberData, role: "Team Mentor" };
          }
          
          // 2. CAD Row
          else if (titleLower.includes("cad")) {
            if (titleLower.includes("lead")) {
              cadLead = memberData;
            } else {
              cadMembers.push(memberData);
            }
          }
          
          // 3. Software Row
          else if (titleLower.includes("software")) {
            if (titleLower.includes("lead")) {
              softwareLead = memberData;
            } else {
              softwareMembers.push(memberData);
            }
          }

          // 4. Build Split Logic (Kyran vs Michael Leads & Custom Split)
          else if (titleLower.includes("build")) {
            if (nameLower.includes("kyran")) {
              buildLead1 = { ...memberData, role: "Build Team Lead (Alpha)" };
            } else if (nameLower.includes("michael")) {
              buildLead2 = { ...memberData, role: "Build Team Lead (Beta)" };
            } 
            // Manual clean split across the 4 standard builders found in your JSON
            else if (nameLower.includes("karim") || nameLower.includes("sophia")) {
              alphaBuildMembers.push(memberData);
            } else if (nameLower.includes("kacper") || nameLower.includes("atharv")) {
              betaBuildMembers.push(memberData);
            }
          }
        });

        setRoster({
          captain, business, mentor, cadLead, cadMembers,
          buildLead1, buildLead2, 
          buildMembers1: alphaBuildMembers, 
          buildMembers2: betaBuildMembers,
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

  // Completely responsive card rendering
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
          width: '100%' 
        }}
      >
        <div style={{ 
          position: 'relative', width: '70px', height: '70px', borderRadius: '50%', 
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
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
          {member.role}
        </p>
      </div>
    );
  };

  // Layout wrapper to format row headers and dynamic CSS columns perfectly
  const renderHorizontalRow = (title, color, leadComponent, membersArray = []) => {
    return (
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600' }}>
          {title}
        </h3>
        <div style={{ 
          display: 'grid', 
          // repeat(auto-fit) stretches the cards out dynamically to completely fill desktop space, 
          // minmax(180px) forces clean responsive collapsing on small mobile screen viewports
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '16px',
          alignItems: 'start'
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
        <p style={{ color: 'var(--text-secondary)' }}>Compiling framework structures...</p>
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

      {/* Row 1: Executive Board (Captain, Business Lead, and Mentor side-by-side expanding) */}
      <div style={{ marginBottom: '44px' }}>
        <h3 style={{ fontSize: '1.25rem', color: colors.captain, borderBottom: `2px solid ${colors.captain}`, paddingBottom: '6px', marginBottom: '20px', fontWeight: '600', textTransform: 'uppercase' }}>
          💼 Executive Administration
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          {renderMemberCard(roster.captain, colors.captain, true)}
          {renderMemberCard(roster.business, colors.business, true)}
          {roster.mentor && renderMemberCard(roster.mentor, colors.mentor, true)}
        </div>
      </div>

      {/* Row 2: CAD Design */}
      {renderHorizontalRow("📐 CAD Design", colors.cad, renderMemberCard(roster.cadLead, colors.cad, true), roster.cadMembers)}

      {/* Row 3: Build Team Alpha */}
      {renderHorizontalRow("🔧 Build Team Alpha", colors.build, renderMemberCard(roster.buildLead1, colors.build, true), roster.buildMembers1)}

      {/* Row 4: Build Team Beta */}
      {renderHorizontalRow("🔧 Build Team Beta", colors.build, renderMemberCard(roster.buildLead2, colors.build, true), roster.buildMembers2)}

      {/* Row 5: Autonomous Programming */}
      {renderHorizontalRow("💻 Programming", colors.software, renderMemberCard(roster.softwareLead, colors.software, true), roster.softwareMembers)}

    </section>
  );
}

export default Team;
