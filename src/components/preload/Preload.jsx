import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './preload.css';

const Preload = () => {
  useEffect(() => {
    const preload = document.querySelector(".preload");
    const image = document.querySelector(".silueta");
    const texto = document.querySelector(".texto");

    setTimeout(() => {
      gsap.to(preload, { y: '-100vh', duration: 1, onComplete: () => {
        preload.style.zIndex = 0;
      }});

      gsap.from(image, { opacity: 0, duration: 1, delay: 0.5 });
      gsap.from(texto, { opacity: 0, duration: 1, delay: 0.7 });
    },2500);
  }, []);

  return (
    <div className="preload">
      <img className="silueta" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1688002778/d3323ed906ef14858160ba8e803832e6-removebg-preview_ougorc.png" alt="silueta" />
      <div className="texto">PalmArt</div>
    </div>
  );
};

export default Preload;
