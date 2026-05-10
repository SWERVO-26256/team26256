import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FolderOpen, FileText, Menu, X, ArrowLeft, ArrowRight } from 'lucide-react';

// Recursive Tree Node Component
const TreeNode = ({ node, activeId }) => {
  const hasChildren = node.subsections && node.subsections.length > 0;
  const hasContent = !!node.content;
  const isActive = activeId === node.id;

  if (!hasChildren) {
    // Leaf node (pure file)
    return (
      <Link 
        to={`/notebook/${node.id}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 8px',
          paddingLeft: '24px',
          textDecoration: 'none',
          color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
          background: isActive ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
          borderRadius: '4px',
          fontSize: '14px',
          transition: 'all 0.2s'
        }}
      >
        <FileText size={16} style={{ color: isActive ? 'var(--gold)' : 'var(--text-secondary)' }} />
        <span style={{ fontWeight: isActive ? '600' : '400' }}>{node.title}</span>
      </Link>
    );
  }

  // Folder (may or may not have content)
  return (
    <div style={{ paddingLeft: '8px', marginBottom: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {hasContent ? (
          <Link 
            to={`/notebook/${node.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              textDecoration: 'none',
              color: isActive ? 'var(--gold)' : 'var(--text-primary)',
              background: isActive ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
              borderRadius: '4px',
              fontSize: '14px',
              flexGrow: 1,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <FolderOpen size={16} style={{ color: 'var(--gold)' }} />
            <span style={{ fontWeight: isActive ? '600' : '500' }}>{node.title}</span>
          </Link>
        ) : (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              flexGrow: 1,
              borderRadius: '4px'
            }}
          >
            <FolderOpen size={16} style={{ color: 'var(--gold)' }} />
            <span style={{ fontWeight: '500' }}>{node.title}</span>
          </div>
        )}
      </div>
      
      <div style={{ borderLeft: '1px solid var(--border-dark)', marginLeft: '12px', paddingLeft: '8px', marginTop: '4px' }}>
        {node.subsections.map((child, i) => (
          <TreeNode 
            key={i} 
            node={child} 
            activeId={activeId} 
          />
        ))}
      </div>
    </div>
  );
};

function Notebook() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('/notebook.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load notebook data", err);
        setLoading(false);
      });
  }, []);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return <section className="page active" style={{ display: 'block', height: 'calc(100vh - 80px)' }}><div className="loader" style={{margin: '100px auto', display: 'block', textAlign: 'center'}}>Loading notebook...</div></section>;
  }

  if (!data) {
    return <section className="page active" style={{ display: 'block', height: 'calc(100vh - 80px)' }}><div className="card" style={{margin: '100px auto', maxWidth: '400px'}}><p>Failed to load notebook.</p></div></section>;
  }

  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeId = pathParts.length > 1 ? pathParts[pathParts.length - 1] : null;

  const entries = [];
  const findEntries = (node) => {
    if (node.content && node.id) {
      entries.push(node);
    }
    const children = node.subsections || node.sections || [];
    children.forEach(findEntries);
  };
  if (data.sections) data.sections.forEach(findEntries);

  let currentEntry = null;
  let currentIndex = -1;

  if (activeId) {
    currentIndex = entries.findIndex(e => e.id === activeId);
    if (currentIndex !== -1) {
      currentEntry = entries[currentIndex];
    }
  } else {
    currentEntry = data.landing;
  }

  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex !== -1 && currentIndex < entries.length - 1 ? entries[currentIndex + 1] : (!activeId && entries.length > 0 ? entries[0] : null);

  const renderContent = (content, links) => {
    if (!content) return null;
    if (!links || Object.keys(links).length === 0) return <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-wrap' }}>{content}</p>;

    const regex = /(\[[^\]]+\])/g;
    const parts = content.split(regex);

    return (
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
        {parts.map((part, i) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const anchor = part.slice(1, -1);
            const targetId = links[anchor];
            if (targetId) {
              return (
                <Link 
                  key={i} 
                  to={`/notebook/${targetId}`}
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: '500' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {anchor}
                </Link>
              );
            }
            return anchor;
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <section className="page fade-in" style={{ display: 'block', padding: 0 }}>
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
        borderTop: '1px solid var(--border-dark)',
        position: 'relative',
        background: 'var(--bg-navy)',
        width: '100%',
        overflow: 'hidden'
      }}>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ 
            position: 'absolute', 
            top: '16px', 
            right: '16px', 
            zIndex: 100, 
            display: 'none',
            background: 'var(--gold)',
            color: 'var(--bg-navy)',
            padding: '10px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: 1,
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)'
          }}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div 
          className={`notebook-sidebar ${sidebarOpen ? 'open' : ''}`}
          style={{
            width: '320px',
            flexShrink: 0,
            borderRight: '1px solid var(--border-dark)',
            background: 'rgba(11, 18, 32, 0.95)',
            overflowY: 'auto',
            padding: '24px 16px',
            transition: 'transform 0.3s ease',
          }}
        >
          <div style={{ marginBottom: '24px', padding: '0 8px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: '600' }}>Explorer</span>
          </div>

          <Link 
            to="/notebook"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              textDecoration: 'none',
              color: !activeId ? 'var(--gold)' : 'var(--text-primary)',
              background: !activeId ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
              borderRadius: '4px',
              marginBottom: '16px',
              fontWeight: !activeId ? '600' : '500',
              fontSize: '14px'
            }}
          >
            <FileText size={16} />
            Landing Page
          </Link>

          {data.sections && data.sections.map((section, i) => (
            <TreeNode 
              key={i} 
              node={section} 
              activeId={activeId} 
            />
          ))}
        </div>

        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '48px',
          background: 'var(--bg-surface)',
          width: '100%'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {currentEntry ? (
              <>
                <div style={{ marginBottom: '40px' }}>
                  <h1 style={{ fontSize: '40px', marginBottom: '16px', color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                    {currentEntry.title}
                  </h1>
                  
                  {(currentEntry.date || currentEntry.author) && (
                    <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px', borderBottom: '1px solid var(--border-dark)', paddingBottom: '24px', flexWrap: 'wrap' }}>
                      {currentEntry.date && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>Date:</span> <strong style={{ color: 'var(--text-primary)' }}>{currentEntry.date}</strong>
                        </div>
                      )}
                      {currentEntry.author && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>Author:</span> <strong style={{ color: 'var(--text-primary)' }}>{currentEntry.author}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="notebook-content">
                  {renderContent(currentEntry.content, currentEntry.links)}
                </div>

                {/* Bottom Navigation */}
                <div style={{ 
                  marginTop: '64px', 
                  borderTop: '1px solid var(--border-dark)', 
                  paddingTop: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '24px'
                }}>
                  <div style={{ flex: 1 }}>
                    {prevEntry && (
                      <Link 
                        to={`/notebook/${prevEntry.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', padding: '12px', border: '1px solid var(--border-dark)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-dark)'; }}
                      >
                        <ArrowLeft size={16} />
                        <div>
                          <div style={{ fontSize: '12px', textTransform: 'uppercase' }}>Previous</div>
                          <div style={{ fontWeight: '500' }}>{prevEntry.title}</div>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div style={{ flex: 1, textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                    {nextEntry && (
                      <Link 
                        to={`/notebook/${nextEntry.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', padding: '12px', border: '1px solid var(--border-dark)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-dark)'; }}
                      >
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', textTransform: 'uppercase' }}>Next</div>
                          <div style={{ fontWeight: '500' }}>{nextEntry.title}</div>
                        </div>
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '100px' }}>
                <FileText size={48} style={{ opacity: 0.2, margin: '0 auto 16px auto' }} />
                <h3>Entry not found</h3>
                <p>The entry you are looking for does not exist.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .notebook-sidebar {
            position: absolute !important;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 50;
            transform: translateX(-100%);
          }
          .notebook-sidebar.open {
            transform: translateX(0);
            box-shadow: 10px 0 30px rgba(0,0,0,0.5);
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}} />
    </section>
  );
}

export default Notebook;
