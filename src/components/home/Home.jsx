import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Scene from '../scene/Scene';
import { gsap } from 'gsap';

const TypewriterEffect = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

const Home = () => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMiClick = () => {
    setShowDescription(true);
  };

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const btnProductosRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    if (showDescription) {
      const timeline = gsap.timeline();

      timeline.fromTo(
        descriptionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      timeline.fromTo(
        btnProductosRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.9'
      );

      timeline.fromTo(
        btnProductosRef.current,
        { scale: 1 },
        { scale: 1.1, repeat: -1, yoyo: true, duration: 1.5 },
        '-=0.8'
      );

      return () => {
        timeline.kill();
      };
    }
  }, [showDescription]);

  const handleCerrarClick = () => {
    setShowDescription(false);
  };

  return (
    <div className="home-container">
      <Scene />
      <div className="presentation">
        <h1 className="title" ref={titleRef}>
          <TypewriterEffect text="PalmArt" speed={200} />
        </h1>
        {!showDescription && (
          <button className="mi" onClick={handleMiClick}>
             <TypewriterEffect text=" Conoce Más Sobre Mí y mi tienda " speed={110}/>
          </button>
        )}
        {showDescription && (
          <div className="description-container show" ref={descriptionRef}>
            <span className="artist-description">
              <TypewriterEffect
                text="Valentina Palma Ledesma, artista de 21 años con un emprendimiento de venta de arte."
                speed={50}
              />
            </span>
            <div className="description-buttons">
              <a href="/productos" className="btn-productos" ref={btnProductosRef}>
              <TypewriterEffect text= "Visita mi Tienda" speed={100}/>
              </a>
              <button className="cerrar-button" onClick={handleCerrarClick}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
