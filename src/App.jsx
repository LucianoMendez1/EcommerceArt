import React, { useState } from 'react';
import './App.css';
import Producto from './components/producto/Producto';
import Carrito from './components/carrito/Carrito';
import { stockProductos } from './components/producto/stockProductos';
import { CartProvider } from './components/carrito/CartContext';

const App = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(true);

  return (
    <CartProvider>
      <div className="nav">
        <h1>navegacion</h1>
      </div>
      <div className="app-container">
        <div className="logo">𝓟𝓪𝓵𝓶𝓪𝓐𝓻𝓽</div>
        <div className="productos-container">
          {stockProductos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
        
        {mostrarCarrito && <Carrito />}
      </div>
    </CartProvider>
  );
};

export default App;
