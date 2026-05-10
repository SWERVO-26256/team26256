import React, { useState } from 'react';

function Gallery() {
  const slides = [
    { bg: '#111827', text: 'Drop image in assets/gallery/', caption: 'Chassis CAD Verification' },
    { bg: '#1F2A3A', text: 'Drop image in assets/robot/', caption: 'Mecanum Drive Subsystem Assembly' },
    { bg: '#0B1220', text: 'Drop image in assets/awards/', caption: 'Regional Competition Matches' }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((currentIndex === slides.length - 1) ? 0 : currentIndex + 1);
  const prevSlide = () => setCurrentIndex((currentIndex === 0) ? slides.length - 1 : currentIndex - 1);

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Visual Highlights</h2>
        <p>A closer look into our iterations, competitions, and outreach events.</p>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-track">
          {slides.map((slide, i) => (
            <div key={i} className={`carousel-slide ${i === currentIndex ? 'active' : ''}`}>
              <div className="placeholder-img" style={{ background: slide.bg }}>{slide.text}</div>
              <div className="carousel-caption">{slide.caption}</div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev-btn" aria-label="Previous Slide" onClick={prevSlide}>&larr;</button>
        <button className="carousel-btn next-btn" aria-label="Next Slide" onClick={nextSlide}>&rarr;</button>
      </div>
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button 
            key={i} 
            className={`indicator ${i === currentIndex ? 'active' : ''}`} 
            onClick={() => setCurrentIndex(i)} 
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
