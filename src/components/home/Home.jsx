import React from 'react';
import './Home.css';
import Scene from '../scene/Scene';

const Home = () => {
  return (
    <div className="home-container">
      <Scene/>
      <div className="presentation">
        <h1 className="title">Palma Art</h1>
        <p className="description">¡Descubre el arte en cada creación!</p>
      </div>
    </div>
  );
};

export default Home;
