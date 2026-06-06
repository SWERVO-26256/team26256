import React, { useState, useEffect } from 'react';

function Team() {
  const [rosterGroups, setRosterGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded subteam colors
  const subteamColors = {
    "Operations Leadership": "#FFB020", // Gold
    "📐 CAD Design": "#00E5FF",           // Cyan
    "🔧 Mechanical Build & Hardware": "#FF3D00", // Red-Orange
    "💻 Autonomous Software": "#00FF66"   // Bright Green
  };

  useEffect(() => {
    fetch('/team-members.json')
      .then((res) => res.json())
      .then((data) => {
        // 1. Process and streamline roles based on your strict rules
        const processedMembers = data.map(member => {
          let role = "Member";
          let subteam = "🔧 Mechanical Build & Hardware"; // Default fallback
          let desc = member.bio || "";

          const nameLower = member.name.toLowerCase();
          const titleLower = (member.title || "").toLowerCase();

          // Captain / Leadership Override
          if (nameLower.includes("heth") || titleLower.includes("captain")) {
            subteam = "Operations Leadership";
            role = "Team Captain";
            desc = "Executive Director & Oversight.";
          }
          // CAD Subteam Grouping
          else if (nameLower.includes("braydon")) {
            subteam = "📐 CAD Design";
            role = "Subteam Lead";
            desc = "Lead CAD Designer.";
          } else if (["muhammad", "mark", "jayden"].some(n => nameLower.includes(n))) {
            subteam = "📐 CAD Design";
            role = "CAD";
            desc = nameLower.includes("muhammad") ? "Mechanism Designer." : nameLower.includes("mark") ? "Systems Integration." : "Vision & Geometry.";
          }
          // Build Subteam Grouping (With custom Co-Leads & Dual Driver)
          else if (nameLower.includes("kyran") || nameLower.includes("michael")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Co-Build Lead";
            desc = nameLower.includes("kyran") ? "Manufacturing & Assembly." : "Mechanical Assembly.";
          } else if (nameLower.includes("kacper")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Driver & Build";
            desc = "Main Robot Driver & Hardware Assembly.";
          } else if (nameLower.includes("prospect 1") || nameLower.includes("prospect 2") || nameLower.includes("prospect 3")) {
            subteam = "🔧 Mechanical Build & Hardware";
            role = "Build";
            desc = "Junior Hardware Fabricator.";
          }
          // Programming / Software Subteam Grouping
          else if (nameLower.includes("rugved") || titleLower.includes("software architecture")) {
            subteam = "💻 Autonomous Software";
            role = "Subteam Lead";
            desc = "Software Architecture Lead.";
          } else if (["aaron", "sophia", "prospect 4"].some(n => nameLower.includes(n)) || titleLower.includes("software") || titleLower.includes("programmer")) {
            subteam = "💻 Autonomous Software";
            role = "Programmer";
            desc = nameLower.includes("aaron") ? "Java Developer & Backup Driver." : nameLower.includes("sophia") ? "Control & TeleOp Programmer." : "Autonomous Systems Specialist.";
          }

          return {
            name: member.name,
            role: role,
            subteam: subteam,
            desc: desc,
            img: member.image ? `/${member.image.replace(/^\//, '')}` : ""
          };
        });

        // 2. Structural Sort: Enforce that Operations Leadership stays on top
        const order = ["Operations Leadership", "📐 CAD Design", "🔧 Mechanical Build & Hardware", "💻 Autonomous Software"];
        
        const grouped = order.map(subteamName => ({
          subteam: subteamName,
          color: subteamColors[subteamName] || "var(--text-main)",
          members: processedMembers.filter(m => m.subteam === subteamName)
        })).filter(g => g.members.length > 0);

        setRosterGroups(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error pulling roster JSON data:", err);
        setLoading(false);
      });
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  if (loading) {
    return (
      <section className="page" style={{ display: 'block', padding: '40px text-align: center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Synchronizing roster logs...</p>
      </section>
    );
  }

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SWERVO 26256 Roster — Optimized for the 2026–2027 season.
        </p>
      </div>

      {rosterGroups.map((group, groupIdx) => (
        <div key={groupIdx} style={{ marginBottom: '48px' }}>
          <h3 style={{ 
            fontSize: '1.4rem', 
            color: group.color,
            borderBottom: `2px solid ${group.color}`, 
            paddingBottom: '8px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            {group.subteam}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {group.members.map((member, memIdx) => {
              const isLead = member.role.includes('Lead') || member.role.includes('Captain');
              return (
                <div 
                  key={memIdx} 
                  className="card" 
                  style={{ 
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderTop: `4px solid ${group.color}`
                  }}
                >
                  <div style={{ 
                    position: 'relative',
                    width: '85px', 
                    height: '85px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2A2A2A', 
                    border: `2px solid ${group.color}`,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
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
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: '600' }}>{member.name}</h4>
                    {isLead && (
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: group.color, fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
                        ★ LEADERSHIP
                      </span>
                    )}
                    <p style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 8px 0', opacity: 0.95 }}>
                      {member.role}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>
                      {member.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Team;
