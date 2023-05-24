import React, { useEffect, useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './Carrito.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    calcularTotal();
  }, [carrito]);

  const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
      totalCompra += producto.precio * producto.cantidad;
    });
    setTotal(totalCompra);
  };

  const handleEliminar = (productoId) => {
    eliminarDelCarrito(productoId);
  };

  const handleVaciarCarrito = () => {
    vaciarCarrito();
  };

  const handleToggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

  return (
    <div className={`carrito ${carritoAbierto ? 'carrito-abierto' : ''}`}>
      <button className="carrito-toggle-btn" onClick={handleToggleCarrito}>
        <i className="fas fa-shopping-cart"></i>
        <span className="carrito-cantidad">{cantidadProductos}</span>
      </button>
      {carritoAbierto && (
        <div className="carrito-contenido">
          <h2>Mi Carrito</h2>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            <div>
              <ul className="carrito-productos">
                {carrito.map((producto) =>
                  producto.cantidad > 0 ? (
                    <li key={producto.id}>
                      <div className="carrito-producto">
                        <img className="carrito-producto-imagen" src={producto.imagen} alt={producto.nombre} />
                        <div className="carrito-producto-info">
                          <p className="carrito-producto-nombre">{producto.nombre}</p>
                          <p className="carrito-producto-cantidad">Cantidad: {producto.cantidad}</p>
                        </div>
                        <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
              <p className="total">Total: ${total}</p>
              <button className="vaciar-btn" onClick={handleVaciarCarrito}>
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carrito;
