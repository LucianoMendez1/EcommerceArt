import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Scene from '../scene/Scene';
import { gsap } from 'gsap';

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
          Palma Art
        </h1>
        {!showDescription && (
          <button className="mi" onClick={handleMiClick}>
            Conoce Más Sobre Mí
          </button>
        )}
        {showDescription && (
          <div className="description-container show" ref={descriptionRef}>
            <span className="artist-description">
              Valentina Palma artista de 21 años con un emprendimiento de venta.
            </span>
            <div className="description-buttons">
              <a href="/productos" className="btn-productos" ref={btnProductosRef}>
                Tienda
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
