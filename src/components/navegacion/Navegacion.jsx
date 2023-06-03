import React from 'react';
import './navegacion.css';
import Carrito from '../carrito/Carrito';

const Navegacion = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-items">
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
      </ul>
      <Carrito />
    </nav>
  );
};

export default Navegacion;
