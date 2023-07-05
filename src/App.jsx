import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/carrito/CartContext';
import Navegacion from './components/navegacion/Navegacion';
import './App.css';


import Home from './components/home/Home';
import Producto from './components/producto/Producto';
import ProductoDetalle from './components/producto/ProductoDetalle';
import Conctacto from './components/contacto/Contacto';
import Carrito from './components/carrito/Carrito';


const LazyHome = lazy(() => import('./components/home/Home'));
const LazyProducto = lazy(() => import('./components/producto/Producto'));
const LazyProductoDetalle = lazy(() => import('./components/producto/ProductoDetalle'));
const LazyConctacto = lazy(() => import('./components/contacto/Contacto'));
const LazyCarrito = lazy(() => import('./components/carrito/Carrito'));

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navegacion />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<LazyHome />} />
            <Route path="/home" element={<LazyHome />} />
            <Route path="/productos" element={<LazyProducto />} />
            <Route path="/producto/:id" element={<LazyProductoDetalle />} />
            <Route path="/producto/home" element={<LazyHome />} />
            <Route path="/producto/producto" element={<LazyProducto />} />
            <Route path="/producto/contacto" element={<LazyConctacto />} />
            <Route path="/producto/productos" element={<LazyProducto />} />
            <Route path="/contacto" element={<LazyConctacto />} />
            <Route path="/carrito" element={<LazyCarrito />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
