import React from 'react';
import { Link } from 'react-router-dom';
import { stockProductos } from './stockProductos';
import Card from './Card';
import Scene2 from '../scene/Scene2';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Producto = () => {
  const handleAgregarAlCarrito = (producto) => {
  };

  return (
    <div className="app-container">
      <Scene2 />
      <div className="logo">Palma Art</div>
      <div className="productos-container">
        {stockProductos.map((producto) => (
          <Card key={producto.id} producto={producto} agregarAlCarrito={() => handleAgregarAlCarrito(producto)} />
        ))}
      </div>
      {/* <Link to="/carrito">Ir al carrito</Link>
 */}
      
    </div>
  );
};

export default Producto;
