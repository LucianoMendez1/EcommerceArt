import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../carrito/CartContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Card = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleClick = () => {
    if (producto.stock > 0) {
      agregarAlCarrito(producto);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
    }
  };

  return (
    <div className="producto">
      <Link to={`/producto/${producto.id}`}>
        <img className="producto-imagen" src={producto.imagen} alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
      </Link>
      <div className="producto-descripcion">{producto.descripcion}</div>
      <p>${producto.precio}</p>
      {producto.stock > 0 ? (
        <button className="button-producto" onClick={handleClick}>
          Agregar al Carrito
        </button>
      ) : (
        <p>No hay stock disponible</p>
      )}
      
      {alertVisible && (
        <Stack sx={{ width: '100%', position: 'absolute', top: 0 }} spacing={2}>
          <Alert severity="success" onClose={() => setAlertVisible(false)}>
            Se agregó el producto al carrito correctamente.
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default Card;
