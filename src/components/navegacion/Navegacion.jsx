import React, { useState } from 'react';
import './navegacion.css';
import Carrito from '../carrito/Carrito';

const Navegacion = () => {
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };

  return (
    <nav className="navbar">
      <div className={`navbar-toggle ${menuActivo ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="navbar-toggle-line"></span>
        <span className="navbar-toggle-line"></span>
        <span className="navbar-toggle-line"></span>
      </div>
      <ul className={`navbar-items ${menuActivo ? 'active' : ''}`}>
        <li className="navbar-item">
          <a href="" className="navbar-link">
            Inicio
          </a>
        </li>
        <li className="navbar-item">
          <a href="productos" className="navbar-link">
            Productos
          </a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">
            Contacto
          </a>
        </li>
        <li>
          <Carrito />
        </li>
      </ul>
    </nav>
  );
};

export default Navegacion;
