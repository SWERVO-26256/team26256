import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Folder, FileText, Home } from 'lucide-react';

function Notebook() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <section className="page fade-in" style={{ display: 'block' }}>
        <div className="loader">Loading notebook data...</div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="page fade-in" style={{ display: 'block' }}>
        <div className="card"><p style={{ color: '#EF4444' }}>Failed to load notebook data.</p></div>
      </section>
    );
  }

  // Parse current path to find the current node in the JSON tree
  const pathSegments = location.pathname.split('/').filter(Boolean).slice(1); // remove 'notebook'
  
  let currentNode = { title: "Notebook Root", subsections: data.sections || [] };
  let currentPath = '/notebook';
  const breadcrumbs = [{ title: "Notebook", path: currentPath }];

  let isEntry = false;

  for (const segment of pathSegments) {
    currentPath += `/${segment}`;
    
    // Find child node
    const children = currentNode.subsections || currentNode.sections;
    if (children) {
      const found = children.find(child => child.id === segment);
      if (found) {
        currentNode = found;
        breadcrumbs.push({ title: found.title, path: currentPath });
        if (!found.subsections || found.subsections.length === 0) {
          isEntry = true;
        }
      } else {
        // Path not found, break and just show what we have
        break;
      }
    }
  }

  // If the node has content and no subsections, it's an entry
  if (currentNode.content) {
    isEntry = true;
  }

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      
      {/* File Explorer Breadcrumb Bar */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-dark)',
        borderRadius: 'var(--radius)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '32px',
        gap: '8px',
        flexWrap: 'wrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Home size={18} style={{ color: 'var(--text-secondary)' }} />
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} style={{ color: 'var(--border-dark)' }} />
            <Link 
              to={crumb.path} 
              style={{ 
                color: index === breadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: index === breadcrumbs.length - 1 ? '600' : '400',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
              onMouseLeave={(e) => e.currentTarget.style.color = index === breadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)'}
            >
              {crumb.title}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {isEntry ? (
        // Entry View
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '24px', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{currentNode.title}</h1>
            <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {currentNode.date && <span><strong>Date:</strong> {currentNode.date}</span>}
              {currentNode.author && <span><strong>Author:</strong> {currentNode.author}</span>}
            </div>
          </div>
          <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-primary)' }}>
            {currentNode.content}
          </div>
        </div>
      ) : (
        // Folder View
        <div className="grid grid-3">
          {(currentNode.subsections || []).map((sub, i) => {
            const isSubEntry = sub.content !== undefined;
            return (
              <Link 
                key={i} 
                to={`${currentPath}/${sub.id}`} 
                className="card"
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '24px'
                }}
              >
                {isSubEntry ? (
                  <FileText size={32} style={{ color: 'var(--accent-blue)' }} />
                ) : (
                  <Folder size={32} style={{ color: 'var(--gold)' }} />
                )}
                <div>
                  <h4 style={{ margin: 0, marginBottom: '4px' }}>{sub.title}</h4>
                  {isSubEntry && (
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{sub.date || 'Entry'}</span>
                  )}
                  {!isSubEntry && (
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Folder</span>
                  )}
                </div>
              </Link>
            )
          })}
          {(!currentNode.subsections || currentNode.subsections.length === 0) && (
            <div style={{ color: 'var(--text-secondary)' }}>This folder is empty.</div>
          )}
        </div>
      )}
    </section>
  );
}

export default Notebook;
