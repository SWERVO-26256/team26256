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

  // Core colors + matching gradients for borders/badges
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
          padding: '28px 16px 20px 16px',
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
          boxSizing: 'border-box',
          flex: '1 1 auto', // Ensures columns stretch evenly
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
          position: 'relative', width: '72px', height: '72px', borderRadius: '50%', 
          backgroundColor: '#2A2A2A', border: `2px solid ${brand.color}`,
          marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#FFFFFF' }}>
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
        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: '600', color: '#FFFFFF', letterSpacing: '0.3px' }}>{member.name}</h4>
        <p style={{ color: '#AAAAAA', fontSize: '0.8rem', margin: 0, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {member.role}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', color: '#AAAAAA' }}>
        <p>Loading structural robotics roster arrays...</p>
      </div>
    );
  }

  const fullBuildTeam = [...roster.buildLeads, ...roster.buildMembers];
  const buildCount = fullBuildTeam.length;
  
  const halfCeil = Math.ceil(buildCount / 2);
  const buildColumn1Items = fullBuildTeam.slice(0, halfCeil);
  const buildColumn2Items = fullBuildTeam.slice(halfCeil);

  // Inline styling utility for modern dynamic gradient pills
  const renderPillBadge = (count, brand) => (
    <span style={{
      fontSize: '0.75rem',
      fontWeight: '800', // Bumped font-weight slightly for extra crispness
      padding: '2px 10px',
      borderRadius: '20px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: brand.gradient, // The pill fill is now the pure, vibrant gradient
      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <span style={{ color: '#000000' }}>
        {count}
      </span>
    </span>
  );

  return (
    <section style={{ display: 'block', padding: '40px 0px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
      
      {/* Roster Main Header */}
      <div style={{ 
        marginBottom: '56px', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        textAlign: 'left' 
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 8px 0', color: '#FFFFFF' }}>
          The Engineers
        </h2>
        <p style={{ color: '#AAAAAA', margin: 0, fontSize: '1rem', letterSpacing: '0.5px' }}>
          SWERVO 26256 Roster
        </p>
      </div>

      {/* Row 1: Executive Management */}
      <div style={{ marginBottom: '56px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h3 style={{ width: '100%', textAlign: 'left', fontSize: '1.1rem', color: branding.captain.color, borderBottom: `1px solid rgba(255,176,32,0.2)`, paddingBottom: '8px', marginBottom: '20px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
          💼 Executive Administration
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', width: '100%' }}>
          {renderMemberCard(roster.captain, branding.captain, true)}
          {renderMemberCard(roster.business, branding.business, true)}
          {roster.mentor && renderMemberCard(roster.mentor, branding.mentor, true)}
        </div>
      </div>

      {/* Master 4-Column Operations Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))', 
        gap: '24px',
        alignItems: 'stretch', // Crucial: stretches nested items across row heights
        width: '100%'
      }}>
        
        {/* ================= HEADERS ROW LAYER ================= */}
        
        <div style={{ gridColumn: 'span 1' }}>
          <h3 style={{ fontSize: '1.1rem', color: branding.cad.color, borderBottom: `1px solid rgba(0,229,255,0.25)`, paddingBottom: '8px', margin: '0 0 24px 0', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📐 CAD Design</span>
            {renderPillBadge(1 + roster.cadMembers.length, branding.cad)}
          </h3>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.1rem', color: branding.build.color, borderBottom: `1px solid rgba(255,61,0,0.25)`, paddingBottom: '8px', margin: '0 0 24px 0', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔧 Build Team</span>
            {renderPillBadge(buildCount, branding.build)}
          </h3>
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <h3 style={{ fontSize: '1.1rem', color: branding.software.color, borderBottom: `1px solid rgba(0,255,102,0.25)`, paddingBottom: '8px', margin: '0 0 24px 0', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>💻 Programming</span>
            {renderPillBadge(1 + roster.softwareMembers.length, branding.software)}
          </h3>
        </div>

        {/* ================= DATA CARD COLUMNS ROW LAYER ================= */}

        {/* Col 1: CAD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {renderMemberCard(roster.cadLead, branding.cad, true)}
          {roster.cadMembers.map((m, i) => <div style={{ display: 'flex', flex: '1 1 auto' }} key={i}>{renderMemberCard(m, branding.cad)}</div>)}
        </div>

        {/* Col 2: Build Segment A */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {buildColumn1Items.map((m, i) => (
            <div style={{ display: 'flex', flex: '1 1 auto' }} key={i}>
              {renderMemberCard(m, branding.build, m.role === "Build Co-Lead")}
            </div>
          ))}
        </div>

        {/* Col 3: Build Segment B */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {buildColumn2Items.map((m, i) => (
            <div style={{ display: 'flex', flex: '1 1 auto' }} key={i}>
              {renderMemberCard(m, branding.build, m.role === "Build Co-Lead")}
            </div>
          ))}
        </div>

        {/* Col 4: Programming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {renderMemberCard(roster.softwareLead, branding.software, true)}
          {roster.softwareMembers.map((m, i) => <div style={{ display: 'flex', flex: '1 1 auto' }} key={i}>{renderMemberCard(m, branding.software)}</div>)}
        </div>

      </div>

      <style>{`
        .team-card-hover:hover {
          transform: translateY(-5px);
          filter: brightness(1.12);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
        }
      `}</style>

    </section>
  );
}

export default Team;