import React from 'react';
import { Link } from 'react-router-dom';
import { stockProductos } from './stockProductos';
import Card from './Card';
import Scene from '../scene/Scene';

const Producto = () => {
  return (
    <div className="app-container">
      <Scene backgroundTexture="../scene/textures/texture1.jpg" />
      <div className="logo">𝓟𝓪𝓵𝓶𝓪𝓐𝓻𝓽</div>
      <div className="productos-container">
        {stockProductos.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Producto;
