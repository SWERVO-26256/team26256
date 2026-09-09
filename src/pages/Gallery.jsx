import React, { useState } from 'react';

function Gallery() {
  // Photos array: empty for now until photos are added for the season.
  const images = [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((currentIndex === images.length - 1) ? 0 : currentIndex + 1);
  const prevSlide = () => setCurrentIndex((currentIndex === 0) ? images.length - 1 : currentIndex - 1);

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Visual Highlights</h2>
        <p>A closer look into our iterations, competitions, and outreach events.</p>
      </div>

      {images.length === 0 ? (
        <div className="card" style={{
          textAlign: 'center',
          padding: '80px 24px',
          maxWidth: '800px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(11, 18, 32, 0.9) 100%)',
          border: '1px dashed var(--border-dark)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(125, 211, 252, 0.1)',
            border: '1px solid rgba(125, 211, 252, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--accent-blue)',
            fontSize: '28px'
          }}>
            📸
          </div>
          
          <h3 style={{ 
            fontSize: '1.8rem', 
            color: '#FFFFFF', 
            marginBottom: '12px',
            fontWeight: 700 
          }}>
            Stay tuned for the season!
          </h3>
          
          <p style={{ 
            maxWidth: '480px', 
            margin: '0 auto', 
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
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
    </section>
  );
}

export default Gallery;
