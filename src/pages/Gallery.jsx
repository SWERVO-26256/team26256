import React, { useState } from 'react';

function Gallery() {
  // Photos array: empty for now until photos are added for the season.
  const images = [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((currentIndex === images.length - 1) ? 0 : currentIndex + 1);
  const prevSlide = () => setCurrentIndex((currentIndex === 0) ? images.length - 1 : currentIndex - 1);

  return (
    <section className="page fade-in" style={{ display: 'block', width: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>Visual Highlights</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 auto', maxWidth: '600px' }}>
            A closer look into our iterations, competitions, and outreach events.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="card" style={{
            textAlign: 'center',
            padding: 'clamp(48px, 8vw, 80px) 24px',
            maxWidth: '700px',
            margin: '0 auto',
            background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(11, 18, 32, 0.9) 100%)',
            border: '1px dashed var(--border-dark)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(125, 211, 252, 0.08)',
              border: '1px solid rgba(125, 211, 252, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 20px',
              color: 'var(--accent-blue)'
            }}>
              <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            
            <h3 style={{ 
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', 
              color: '#FFFFFF', 
              marginBottom: '12px',
              fontWeight: 700 
            }}>
              Stay tuned for the season!
            </h3>
            
            <p style={{ 
              maxWidth: '460px', 
              margin: '0 auto', 
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6 
            }}>
              Match highlights, build photos, and event captures from the 2026–2027 FTC season will be published here as our competitions begin.
            </p>
          </div>
        ) : (
          <>
            <div className="carousel-wrapper">
              <div className="carousel-track">
                {images.map((slide, i) => (
                  <div key={i} className={`carousel-slide ${i === currentIndex ? 'active' : ''}`}>
                    <img src={slide.src} alt={slide.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="carousel-caption">{slide.caption}</div>
                  </div>
                ))}
              </div>

              <button className="carousel-btn prev-btn" aria-label="Previous Slide" onClick={prevSlide}>&larr;</button>
              <button className="carousel-btn next-btn" aria-label="Next Slide" onClick={nextSlide}>&rarr;</button>
            </div>
            <div className="carousel-indicators">
              {images.map((_, i) => (
                <button 
                  key={i} 
                  className={`indicator ${i === currentIndex ? 'active' : ''}`} 
                  onClick={() => setCurrentIndex(i)} 
                  aria-label={`Slide ${i + 1}`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Gallery;
