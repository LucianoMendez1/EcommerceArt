import React from "react";
import { Link, useParams } from "react-router-dom";
import Scene3 from "../scene/Scene3";
import { FaInstagram } from "react-icons/fa";
import "./contacto.css";
import "../navegacion/navegacion.css";

const Contacto = () => {
  const { id } = useParams();

  return (
    <div className="contacto-page">
      <Scene3/>
      <div className="contacto-container">
        
        <h1 className="contacto-titulo">Contacto</h1>
        <p>
          Si deseas solicitar un cuadro a medida, por favor contáctanos a través
          de Instagram:
        </p>
        <p>
          <a href="https://www.instagram.com/lapalmito.art/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />lapalmito.art
          </a>
        </p>
        <div className="fin">Gracias.</div>
      </div>
    </div>
  );
};

export default Contacto;
