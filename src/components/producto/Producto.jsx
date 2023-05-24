import React, { useContext } from 'react';
import { CartContext } from '../carrito/CartContext';

const Producto = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const { id, nombre, precio, stock } = producto;

  const handleClick = () => {
    if (stock > 0) {
      agregarAlCarrito(producto);
    }
  };

  return (
    <div className="producto">
      <img className="producto-imagen" src={producto.imagen} alt={producto.nombre} />
      <h3>{nombre}</h3>
      <div className="producto-descripcion">{producto.descripcion} </div>
      <p>${precio}</p>

      
      {stock > 0 ? (
        <button className="button-producto"onClick={handleClick}>Agregar al Carrito</button>
      ) : (
        <p>No hay stock disponible</p>
      )}
    </div>
  );
};

export default Producto;
