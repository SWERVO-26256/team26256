import React, { useState, useEffect } from 'react';

function Team() {
  const [leadership, setLeadership] = useState([]);
  const [technicalTeams, setTechnicalTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded subteam & structure accent colors
  const subteamColors = {
    "Leadership & Operations": "#FFB020",  // Gold / Amber
    "📐 CAD Design": "#00E5FF",            // Cyan
    "🔧 Mechanical Build & Hardware": "#FF3D00",  // Red-Orange
    "💻 Autonomous Software": "#00FF66"    // Bright Green
  };

  useEffect(() => {
    fetch('/team-members.json')
      .then((res) => res.json())
      .then((data) => {
        // Process names and map directly to clean subteams and roles
        const processedMembers = data.map(member => {
          let role = "Member";
          let subteam = "🔧 Mechanical Build & Hardware"; // Default fallback

          const nameLower = member.name.toLowerCase();
          const titleLower = (member.title || "").toLowerCase();

          // Operations & Business Leadership Rules
          if (nameLower.includes("heth") || titleLower.includes("captain")) {
            subteam = "Leadership & Operations";
            role = "Team Captain";
          } else if (nameLower.includes("allison") || titleLower.includes("business") || titleLower.includes("media")) {
            subteam = "Leadership & Operations";
            role = "Business & Media Lead";
          }
          // CAD Subteam Rules
          else if (nameLower.includes("braydon")) {
            subteam = "📐 CAD Design";
            role = "CAD Subteam Lead";
          } else if (["muhammad", "mark", "jayden"].some(n => nameLower.includes(n))) {
            subteam = "📐 CAD Design";
            role = "CAD Specialist";
          }
          // Build Subteam Rules
          else if (nameLower.includes("kyran") || nameLower.includes("michael")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Co-Build Lead";
          } else if (nameLower.includes("kacper")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Driver & Build";
          } else if (nameLower.includes("prospect 1") || nameLower.includes("prospect 2") || nameLower.includes("prospect 3")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Build";
          }
          // Programming Subteam Rules
          else if (nameLower.includes("rugved") || titleLower.includes("software architecture")) {
            subteam = "💻 Autonomous Software";
            role = "Software Subteam Lead";
          } else if (["aaron", "sophia", "prospect 4"].some(n => nameLower.includes(n)) || titleLower.includes("software") || titleLower.includes("programmer")) {
            subteam = "💻 Autonomous Software";
            role = "Programmer";
          }

          return {
            name: member.name,
            role: role,
            subteam: subteam,
            img: member.image ? `/${member.image.replace(/^\//, '')}` : ""
          };
        });

        // Split data: Extract all Leads, Co-Leads, Captains, and Business members to the top row
        const leadList = processedMembers.filter(m => 
          m.role.includes("Lead") || m.role.includes("Captain") || m.subteam === "Leadership & Operations"
        );

        // Put remaining engineers into their respective technical rows/columns below
        const techSubteamsOrder = ["📐 CAD Design", "🔧 Mechanical Build & Hardware", "💻 Autonomous Software"];
        const techGroups = techSubteamsOrder.map(subteamName => ({
          subteam: subteamName,
          color: subteamColors[subteamName],
          members: processedMembers.filter(m => 
            m.subteam === subteamName && !m.role.includes("Lead") && !m.role.includes("Captain")
          )
        })).filter(g => g.members.length > 0);

        setLeadership(leadList);
        setTechnicalTeams(techGroups);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error pulling roster JSON logs:", err);
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

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Synchronizing roster logs...</p>
      </section>
    );
  }

  // Streamlined card renderer focusing entirely on Name, Title, and Profile Avatar/Initials
  const renderMemberCard = (member, accentColor) => (
    <div 
      className="card" 
      style={{ 
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: `4px solid ${accentColor}`
      }}
    >
      <div style={{ 
        position: 'relative', width: '85px', height: '85px', borderRadius: '50%', 
        backgroundColor: '#2A2A2A', border: `2px solid ${accentColor}`,
        marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
      }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--text-main)' }}>
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

      <div style={{ width: '100%' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: '600' }}>{member.name}</h4>
        
        {(member.role.includes('Lead') || member.role.includes('Captain')) && (
          <span style={{ 
            fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.8px', 
            color: accentColor, fontWeight: 'bold', display: 'block', marginBottom: '8px' 
          }}>
            ★ LEADERSHIP
          </span>
        )}
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500', margin: 0 }}>
          {member.role}
        </p>
      </div>
    </div>
  );

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SWERVO 26256 Roster — Optimized for the 2026–2027 season.
        </p>
      </div>

      {/* Row 1: Absolute Leadership Row (Captain, Business Lead, and Subteam Leads side-by-side) */}
      <div style={{ marginBottom: '56px' }}>
        <h3 style={{ 
          fontSize: '1.4rem', color: subteamColors["Leadership & Operations"],
          borderBottom: `2px solid ${subteamColors["Leadership & Operations"]}`, 
          paddingBottom: '8px', marginBottom: '24px', fontWeight: '600'
        }}>
          💼 Leadership & Operations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {leadership.map((member, idx) => renderMemberCard(member, subteamColors[member.subteam] || subteamColors["Leadership & Operations"]))}
        </div>
      </div>

      {/* Remaining Core Technical Columns */}
      {technicalTeams.map((group, groupIdx) => (
        <div key={groupIdx} style={{ marginBottom: '48px' }}>
          <h3 style={{ 
            fontSize: '1.4rem', color: group.color,
            borderBottom: `2px solid ${group.color}`, 
            paddingBottom: '8px', marginBottom: '24px', fontWeight: '600'
          }}>
            {group.subteam}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {group.members.map((member, idx) => renderMemberCard(member, group.color))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Team;
