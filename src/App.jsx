import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/carrito/CartContext';
import Navegacion from './components/navegacion/Navegacion';
import './App.css';


import Home from './components/home/Home';
import Producto from './components/producto/Producto';
import ProductoDetalle from './components/producto/ProductoDetalle';
import Contacto from './components/contacto/Contacto';
import Carrito from './components/carrito/Carrito';




const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navegacion />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/productos" element={<Producto />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/producto/home" element={<Home />} />
            <Route path="/producto/producto" element={<Producto />} />
            <Route path="/producto/Contacto" element={<Contacto />} />
            <Route path="/producto/productos" element={<Producto />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
