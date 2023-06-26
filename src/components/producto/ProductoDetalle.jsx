import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { stockProductos } from './stockProductos';
import './productoDetalle.css';
import { CartContext } from '../carrito/CartContext';
import Scene2 from '../scene/Scene2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const producto = stockProductos.find((producto) => producto.id === parseInt(id));
  if (!producto) {
    return <div>Error: Producto no encontrado</div>;
  }

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    setAlertaVisible(true);
  };

  const handleCloseAlerta = () => {
    setAlertaVisible(false);
  };

  return (
    <div className="producto-detalle1-container1">
      <Scene2 />
      <img className="producto-imagen1" src={producto.imagen} alt={producto.nombre} />
      <div className="producto-info1">
        <h3 className="producto-nombre1">{producto.nombre}</h3>
        <p className="producto-descripcion1">{producto.descripcion}</p>
        <p className="producto-precio1">${producto.precio}</p>
        <button className="button-producto" onClick={handleAgregarAlCarrito}>
          Agregar al Carrito
        </button>
      </div>
      <Snackbar open={alertaVisible} autoHideDuration={1000} onClose={handleCloseAlerta}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseAlerta} severity="success">
          El producto se agregó al carrito correctamente.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ProductoDetalle;
