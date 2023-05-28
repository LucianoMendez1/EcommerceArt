import React, { useState } from 'react';
import { stockProductos } from './stockProductos';
import Carrito from '../carrito/Carrito';
import Card from './Card';

const Producto = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(true);

  return (
      <div className="app-container">
        <div className="logo">𝓟𝓪𝓵𝓶𝓪𝓐𝓻𝓽</div>
        <div className="productos-container">
          {stockProductos.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}
        </div>
        
        {mostrarCarrito && <Carrito />}
      </div> 
  );
};

export default Producto;
