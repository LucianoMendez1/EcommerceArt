import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navegacion = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);



  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
        {usuario ? (
          <li>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Iniciar sesión</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navegacion;
