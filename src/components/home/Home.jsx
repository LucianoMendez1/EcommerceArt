import React from 'react';
import './home.css';
import Scene from '../scene/Scene';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Scene />
      <div className="presentation">
        <h1 className="title">Palma Art</h1>
        <p className="description">¡Descubre el arte en cada creacion!</p>
        <Link to="/productos" className="btn-productos">Tienda</Link>
      </div>
    </div>
  );
};

export default Home;
