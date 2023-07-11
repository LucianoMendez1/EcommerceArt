import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { stockProductos } from './stockProductos';
import Card from './Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Scene2 = lazy(() => import('../scene/Scene2'));

const Producto = () => {
  const handleAgregarAlCarrito = (producto) => {
    // Lógica para agregar el producto al carrito
  };

  return (
    <div className="app-container">
      <Suspense fallback={<div>Loading Scene...</div>}>
        <Scene2 />
      </Suspense>
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
