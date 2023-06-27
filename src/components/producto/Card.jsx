import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../carrito/CartContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Card = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const cardRef = useRef(null);

  const handleClick = () => {
    if (producto.stock > 0) {
      agregarAlCarrito(producto);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cardElement = cardRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(cardElement, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Efecto de levantamiento al pasar el mouse por encima
    gsap.set(cardElement, { transformStyle: 'preserve-3d' });

    cardElement.addEventListener('mouseenter', () => {
      gsap.to(cardElement, {
        duration: 0.3,
        rotationY: 30,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      });
    });

    cardElement.addEventListener('mouseleave', () => {
      gsap.to(cardElement, {
        duration: 0.3,
        rotationY: 0,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      });
    });
  }, []);

  return (
    <div className="producto" ref={cardRef}>
      <Link to={`/producto/${producto.id}`}>
        <img className="producto-imagen" src={producto.imagen} alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
      </Link>
      <div className="producto-descripcion">{producto.descripcion}</div>
      <p>${producto.precio}</p>
      {producto.stock > 0 ? (
        <button className="button-producto" onClick={handleClick}>
          Agregar al Carrito
        </button>
      ) : (
        <p>No hay stock disponible</p>
      )}
      
      {alertVisible && (
        <Stack sx={{ width: '100%', position: 'absolute', top: 0 }} spacing={2}>
          <Alert severity="success" onClose={() => setAlertVisible(false)}>
            Se agregó el producto al carrito correctamente.
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default Card;
