import React, { createContext, useState } from 'react';


export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);


  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };


  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
