import React from 'react';

function Team() {
  // Finalized 16-slot structure (13 named members + 3 rookies)
  const roster = [
    {
      subteam: "📐 CAD Design",
      members: [
        { name: "Braydon", role: "Subteam Lead", desc: "Lead CAD Designer. Onshape architecture, top-level assemblies, and virtual stress testing." },
        { name: "Muhammad", role: "Core CAD Specialist", desc: "Mechanism Designer. Core 3D modeling and physical spacing for hardware mechanisms." },
        { name: "Mark", role: "CAD/Build Hybrid", desc: "Systems Integration Lead. Bridges design and fabrication, overseeing physical execution." },
        { name: "Jayden", role: "CAD/Software Hybrid", desc: "Vision & Geometry Engineer. Robot drone systems and autonomous sensor camera placement." }
      ]
    },
    {
      subteam: "🔧 Mechanical Build & Hardware",
      members: [
        { name: "Kyran", role: "Subteam Lead", desc: "Manufacturing & Assembly Lead. Drivetrain/intake fabrication and finance consulting." },
        { name: "Kacper", role: "Driver & Builder", desc: "Main Robot Driver & Hardware Assembly. High-velocity driver practice and assembly." },
        { name: "Michael Sequeira", role: "Pure Builder", desc: "Mechanical Assembly Technician. Rapid prototyping, structural bolting, and lab maintenance." },
        { name: "Prospect 1", role: "Rookie Build Specialist", desc: "Junior Hardware Fabricator. Rapid physical assembly and intake prototyping pipelines." },
        { name: "Prospect 2", role: "Pure Builder / Rookie", desc: "Junior Hardware Fabricator. Chassis assembly, tool management, and parts organization." },
        { name: "Prospect 3", role: "Pure Builder / Rookie", desc: "Junior Hardware Fabricator. Assembly execution, field maintenance, and material prep." }
      ]
    },
    {
      subteam: "💻 Autonomous Software",
      members: [
        { name: "Rugved", role: "Subteam Lead", desc: "Software Architecture Lead. Code-to-chassis integration, environment structuring, and sponsorships." },
        { name: "Prospect 4", role: "Lead Developer", desc: "Autonomous Systems Specialist. Advanced Java writing, autonomous routines, and odometry path-planning." },
        { name: "Aaron", role: "Hybrid Programmer & Driver", desc: "Java Developer & Backup Driver. Implements features and trains as secondary match operator." },
        { name: "Sophia", role: "Pure Programmer", desc: "Control & TeleOp Programmer. Java coding, driver mapping configurations, and scoring automation." }
      ]
    },
    {
      subteam: "💼 Business & Operations",
      members: [
        { name: "Allison", role: "Subteam Lead", desc: "Director of Business & Media. Administration, outreach materials, school coordination, and portfolio." },
        { name: "Heth Maheswari", role: "Team Captain", desc: "Executive Director & Oversight. Overarching strategy, schedule rotations, budget, and corporate campaigns." }
      ]
    }
  ];

  return (
    <section className="page fade-in" style={{ display: 'block', padding: '20px 16px' }}>
      <div className="page-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>The Engineers</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidh: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SWERVO 26256 Roster — Optimized for the 2026–2027 season.
        </p>
      </div>

      {roster.map((group, groupIdx) => (
        <div key={groupIdx} style={{ marginBottom: '48px' }}>
          {/* Subteam Header */}
          <h3 style={{ 
            fontSize: '1.4rem', 
            borderBottom: '1px solid var(--text-secondary)', 
            paddingBottom: '8px', 
            marginBottom: '24px',
            opacity: 0.9 
          }}>
            {group.subteam}
          </h3>

          {/* Members Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '20px'
            }}
          >
            {group.members.map((member, memIdx) => (
              <div 
                key={memIdx} 
                className="card" 
                style={{ 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '600' }}>{member.name}</h4>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px',
                      color: member.role.includes('Lead') || member.role.includes('Captain') ? 'var(--text-main)' : 'var(--text-secondary)',
                      fontWeight: 'bold'
                    }}>
                      {member.role.includes('Lead') || member.role.includes('Captain') ? '★ Lead' : ''}
                    </span>
                  </div>
                  
                  <p style={{ 
                    color: 'var(--text-main)', 
                    fontSize: '0.85rem', 
                    fontWeight: '500', 
                    margin: '0 0 12px 0',
                    opacity: 0.85
                  }}>
                    {member.role}
                  </p>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.85rem', 
                    lineHeight: '1.5', 
                    margin: 0 
                  }}>
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Strategy Footnote */}
      <div className="card" style={{ marginTop: '56px', padding: '24px', opacity: 0.85 }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>⚙️ Dynamic Strategy Note</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
          Our crossover players dynamically shift across disciplines to resolve system bottlenecks. During critical milestone cycles, engineering units support business operations to meet resource management targets.
        </p>
      </div>
    </section>
  );
}

export default Team;
