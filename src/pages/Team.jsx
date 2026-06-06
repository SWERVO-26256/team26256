import React from 'react';

function Team() {
  // Configured with specific colors per subteam, co-leads, simplified descriptions, and image mappings
  const roster = [
    {
      subteam: "💼 Operations Leadership",
      color: "#FFB020", // Amber Gold
      members: [
        { name: "Heth Maheswari", role: "Team Captain", desc: "Executive Director & Oversight.", img: "/assets/team/heth.jpg" }
      ]
    },
    {
      subteam: "📐 CAD Design",
      color: "#00E5FF", // Cyan
      members: [
        { name: "Braydon", role: "Subteam Lead", desc: "Lead CAD Designer.", img: "/assets/team/braydon.jpg" },
        { name: "Muhammad", role: "CAD", desc: "Mechanism Designer.", img: "/assets/team/muhammad.jpg" },
        { name: "Mark", role: "CAD", desc: "Systems Integration.", img: "/assets/team/mark.jpg" },
        { name: "Jayden", role: "CAD", desc: "Vision & Geometry.", img: "/assets/team/jayden.jpg" }
      ]
    },
    {
      subteam: "🔧 Mechanical Build & Hardware",
      color: "#FF3D00", // Red-Orange
      members: [
        { name: "Kyran", role: "Co-Build Lead", desc: "Manufacturing & Assembly.", img: "/assets/team/kyran.jpg" },
        { name: "Michael Sequeira", role: "Co-Build Lead", desc: "Mechanical Assembly.", img: "/assets/team/michael.jpg" },
        { name: "Kacper", role: "Driver & Build", desc: "Main Robot Driver & Hardware Assembly.", img: "/assets/team/kacper.jpg" },
        { name: "Prospect 1", role: "Build", desc: "Junior Hardware Fabricator.", img: "" },
        { name: "Prospect 2", role: "Build", desc: "Junior Hardware Fabricator.", img: "" },
        { name: "Prospect 3", role: "Build", desc: "Junior Hardware Fabricator.", img: "" }
      ]
    }
  ];

  // Helper to safely get 1 or 2 uppercase initials
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Helper to fall back gracefully to initials badge if image loads fail
  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SWERVO 26256 Roster — Optimized for the 2026–2027 season.
        </p>
      </div>

      {roster.map((group, groupIdx) => (
        <div key={groupIdx} style={{ marginBottom: '48px' }}>
          {/* Hardcoded Custom-Colored Subteam Header */}
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

          {/* Members Responsive Layout Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
              gap: '20px'
            }}
          >
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
                    borderTop: `4px solid ${group.color}` // Visual accent tying back to subteam color
                  }}
                >
                  {/* Photo Profile Section with Automatic Fallback Initials Badge */}
                  <div 
                    style={{ 
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
                    }}
                  >
                    {/* Render raw initials text hidden behind image; displays only if image is absent or broken */}
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '20px', 
                      color: 'var(--text-main)',
                      letterSpacing: '0.5px'
                    }}>
                      {getInitials(member.name)}
                    </span>

                    {member.img && (
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        onError={handleImageError}
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }} 
                      />
                    )}
                  </div>

                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: '600' }}>
                        {member.name}
                      </h4>
                      
                      {isLead && (
                        <span style={{ 
                          fontSize: '0.7rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.8px',
                          color: group.color,
                          fontWeight: 'bold',
                          marginBottom: '6px'
                        }}>
                          ★ LEADERSHIP
                        </span>
                      )}
                    </div>
                    
                    <p style={{ 
                      color: 'var(--text-main)', 
                      fontSize: '0.85rem', 
                      fontWeight: '600', 
                      margin: '0 0 8px 0',
                      opacity: 0.95
                    }}>
                      {member.role}
                    </p>
                    
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.85rem', 
                      lineHeight: '1.4', 
                      margin: 0 
                    }}>
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
