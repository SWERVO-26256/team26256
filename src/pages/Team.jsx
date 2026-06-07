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
  const [activeMobileTab, setActiveMobileTab] = useState('cad');

  const branding = {
    captain: { color: "#FFB020", gradient: "linear-gradient(135deg, #FFB020, #FF8000)" },
    business: { color: "#E040FB", gradient: "linear-gradient(135deg, #E040FB, #AA00FF)" },
    mentor: { color: "#00E676", gradient: "linear-gradient(135deg, #00E676, #00B0FF)" },
    cad: { color: "#00E5FF", gradient: "linear-gradient(135deg, #00E5FF, #0086FF)" },
    build: { color: "#FF3D00", gradient: "linear-gradient(135deg, #FF3D00, #FF9100)" },
    software: { color: "#00FF66", gradient: "linear-gradient(135deg, #00FF66, #00E5FF)" }
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

          if (nameLower.includes("heth") || titleLower.includes("captain")) {
            captain = { ...memberData, role: "Captain" };
          } else if (nameLower.includes("allison") || titleLower === "business team lead") {
            business = { ...memberData, role: "Business Team" };
          } else if (titleLower.includes("mentor") || titleLower.includes("advisor")) {
            mentor = { ...memberData, role: "Team Mentor" };
          } else if (titleLower.includes("cad")) {
            if (titleLower.includes("lead")) cadLead = memberData;
            else cadMembers.push(memberData);
          } else if (titleLower.includes("software")) {
            if (titleLower.includes("lead")) {
              softwareLead = { ...memberData, role: "Software Team Lead" };
            } else {
              softwareMembers.push(memberData);
            }
          } else if (titleLower.includes("build")) {
            if (titleLower.includes("lead")) {
              buildLeads.push({ ...memberData, role: "Build Co-Lead" });
            } else {
              buildMembers.push(memberData);
            }
          }
        });

        setRoster({
          captain, business, mentor,
          cadLead, cadMembers,
          buildLeads, buildMembers,
          softwareLead, softwareMembers
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error formatting roster data matrix:", err);
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

  const renderMemberCard = (member, brand, isLead = false) => {
    if (!member) return null;
    const displayLeadBadge = isLead && member.role !== "Captain" && member.role !== "Business Team";

    return (
      <div 
        className="card team-card-hover" 
        style={{ 
          position: 'relative',
          padding: '24px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: `4px solid ${brand.color}`,
          borderLeft: '1px solid rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
          background: 'linear-gradient(180deg, #1F1F1F 0%, #161616 100%)',
          borderRadius: '8px',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          justifyContent: 'center',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, filter 0.25s ease'
        }}
      >
        {displayLeadBadge && (
          <span style={{ 
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontSize: '0.6rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.5px', 
            color: brand.color, 
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            ★ Lead
          </span>
        )}

        <div style={{ 
          position: 'relative', width: '64px', height: '64px', borderRadius: '50%', 
          backgroundColor: '#2A2A2A', border: `2px solid ${brand.color}`,
          marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#FFFFFF' }}>
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
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600', color: '#FFFFFF', letterSpacing: '0.3px' }}>{member.name}</h4>
        <p style={{ color: '#AAAAAA', fontSize: '0.75rem', margin: 0, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {member.role}
        </p>
      </div>
    );
  };

  const buildCount = roster.buildLeads.length + roster.buildMembers.length;
  const fullBuildMobileArray = [...roster.buildLeads, ...roster.buildMembers];

  if (loading) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', color: '#AAAAAA' }}>
        <p>Loading balanced tracking structures...</p>
      </div>
    );
  }

  return (
    <section style={{ display: 'block', padding: '40px 16px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
      
      {/* Title block */}
      <div style={{ marginBottom: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 8px 0', color: '#FFFFFF' }}>The Engineers</h2>
        <p style={{ color: '#AAAAAA', margin: 0, fontSize: '1rem', letterSpacing: '0.5px' }}>SWERVO 26256 Roster</p>
      </div>

      {/* ========================================================== */}
      {/* 1. DESKTOP/LAPTOP VERSION: ALIGNED DASHBOARD GENERATOR     */}
      {/* ========================================================== */}
      <div className="desktop-dashboard-container">
        
        {/* Row 1: Operations Management Strip (6 Columns across total width) */}
        <div className="leads-horizontal-strip">
          <div>{renderMemberCard(roster.captain, branding.captain, true)}</div>
          <div>{renderMemberCard(roster.business, branding.business, true)}</div>
          <div>{renderMemberCard(roster.cadLead, branding.cad, true)}</div>
          <div>{renderMemberCard(roster.softwareLead, branding.software, true)}</div>
          <div>{roster.buildLeads[0] && renderMemberCard(roster.buildLeads[0], branding.build, true)}</div>
          <div>{roster.buildLeads[1] && renderMemberCard(roster.buildLeads[1], branding.build, true)}</div>
        </div>

        {/* Row 2 & Beyond: Unified 3x3 Matrix bound perfectly to matching endpoints */}
        <div className="matrix-3x3-block">
          {/* ROW 3 (Top Matrix Layer) */}
          <div className="matrix-cell">{roster.buildMembers[0] && renderMemberCard(roster.buildMembers[0], branding.build)}</div>
          <div className="matrix-cell">{roster.buildMembers[1] && renderMemberCard(roster.buildMembers[1], branding.build)}</div>
          <div className="matrix-cell">{roster.cadMembers[0] && renderMemberCard(roster.cadMembers[0], branding.cad)}</div>

          {/* ROW 2 (Middle Matrix Layer) */}
          <div className="matrix-cell">{roster.buildMembers[2] && renderMemberCard(roster.buildMembers[2], branding.build)}</div>
          <div className="matrix-cell">{roster.buildMembers[3] && renderMemberCard(roster.buildMembers[3], branding.build)}</div>
          <div className="matrix-cell">{roster.cadMembers[1] && renderMemberCard(roster.cadMembers[1], branding.cad)}</div>

          {/* ROW 1 (Bottom Matrix Layer) */}
          <div className="matrix-cell">{roster.softwareMembers[0] && renderMemberCard(roster.softwareMembers[0], branding.software)}</div>
          <div className="matrix-cell">{roster.softwareMembers[1] && renderMemberCard(roster.softwareMembers[1], branding.software)}</div>
          <div className="matrix-cell">{roster.softwareMembers[2] && renderMemberCard(roster.softwareMembers[2], branding.software)}</div>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 2. MOBILE RESPONSIVE LAYOUT (Kept Exactly As Requested)     */}
      {/* ========================================================== */}
      <div className="mobile-only-layout">
        
        {/* Fixed Core Administration Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {renderMemberCard(roster.captain, branding.captain, true)}
          {renderMemberCard(roster.business, branding.business, true)}
          {roster.mentor && renderMemberCard(roster.mentor, branding.mentor, true)}
        </div>

        {/* Segment Tabs Controller */}
        <div className="mobile-tabs-container">
          <button 
            className={`tab-btn ${activeMobileTab === 'cad' ? 'active-cad' : ''}`}
            onClick={() => setActiveMobileTab('cad')}
          >
            CAD ({1 + roster.cadMembers.length})
          </button>
          <button 
            className={`tab-btn ${activeMobileTab === 'build' ? 'active-build' : ''}`}
            onClick={() => setActiveMobileTab('build')}
          >
            Build ({buildCount})
          </button>
          <button 
            className={`tab-btn ${activeMobileTab === 'software' ? 'active-software' : ''}`}
            onClick={() => setActiveMobileTab('software')}
          >
            Code ({1 + roster.softwareMembers.length})
          </button>
        </div>

        {/* Responsive Content Pipeline */}
        <div style={{ marginTop: '24px' }}>
          {activeMobileTab === 'cad' && (
            <div className="mobile-cards-stack">
              {renderMemberCard(roster.cadLead, branding.cad, true)}
              {roster.cadMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, branding.cad)}</React.Fragment>)}
            </div>
          )}

          {activeMobileTab === 'build' && (
            <div className="mobile-cards-stack">
              <div className="mobile-build-2x2">
                {fullBuildMobileArray.map((m, i) => (
                  <React.Fragment key={i}>
                    {renderMemberCard(m, branding.build, m.role === "Build Co-Lead")}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {activeMobileTab === 'software' && (
            <div className="mobile-cards-stack">
              {renderMemberCard(roster.softwareLead, branding.software, true)}
              {roster.softwareMembers.map((m, i) => <React.Fragment key={i}>{renderMemberCard(m, branding.software)}</React.Fragment>)}
            </div>
          )}
        </div>

      </div>

      {/* Embedded Responsive Design Engine */}
      <style>{`
        /* Desktop/Laptop UI Engine Styles */
        .desktop-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }
        .leads-horizontal-strip {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }
        .matrix-3x3-block {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }
        .matrix-cell {
          width: 100%;
        }
        .mobile-only-layout {
          display: none;
        }
        .team-card-hover:hover {
          transform: translateY(-5px);
          filter: brightness(1.12);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
        }

        /* Mobile Layout Selectors Layout Rules */
        .mobile-tabs-container {
          display: flex;
          background-color: #1A1A1A;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          box-sizing: border-box;
        }
        .tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #888888;
          padding: 10px 0;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-build-2x2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        /* Sync Mobile Theme Selected Tabs Colors */
        .active-cad {
          background-color: rgba(0, 229, 255, 0.1) !important;
          color: #00E5FF !important;
        }
        .active-build {
          background-color: rgba(255, 61, 0, 0.1) !important;
          color: #FF3D00 !important;
        }
        .active-software {
          background-color: rgba(0, 255, 102, 0.1) !important;
          color: #00FF66 !important;
        }

        /* Layout Media Breakpoint Switcher */
        @media (max-width: 950px) {
          .desktop-dashboard-container {
            display: none;
          }
          .mobile-only-layout {
            display: block;
          }
        }
      `}</style>

    </section>
  );
}

export default Team;