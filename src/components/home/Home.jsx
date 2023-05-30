import React from 'react';
import './home.css';
import Scene from '../scene/Scene';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Scene />
      <div className="presentation">
        <h1 className="title">𝓟𝓪𝓵𝓶𝓪𝓐𝓻t</h1>
        <p className="description">¡𝓓𝓮𝓼𝓬𝓾𝓫𝓻𝓮 𝓮𝓵 𝓪𝓻𝓽𝓮 𝓮𝓷 𝓬𝓪𝓭𝓪 𝓬𝓻𝓮𝓪𝓬𝓲ó𝓷!</p>
        <Link to="/productos" className="btn-productos">𝓣𝓲𝓮𝓷𝓭𝓪</Link>
      </div>
    </div>
  );
};

export default Home;
