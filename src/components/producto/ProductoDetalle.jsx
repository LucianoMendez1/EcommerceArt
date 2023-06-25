import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { stockProductos } from './stockProductos';
import './productoDetalle.css';
import { CartContext } from '../carrito/CartContext';
import Scene  from '../scene/Scene';

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  const producto = stockProductos.find((producto) => producto.id === parseInt(id));
  if (!producto) {
    return <div>Error: Producto no encontrado</div>;
  }

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="producto-detalle1-container1">
     <Scene  />
      <img className="producto-imagen1" src={producto.imagen} alt={producto.nombre} />
      <div className="producto-info1">
        <h3 className="producto-nombre1">{producto.nombre}</h3>
        <p className="producto-descripcion1">{producto.descripcion}</p>
        <p className="producto-precio1">${producto.precio}</p>
        <button className="button-producto" onClick={handleAgregarAlCarrito}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoDetalle;
