import React from "react";
import { Link } from "react-router-dom";
import Scene2 from "../scene/Scene2";
import "./Contacto.css";
import { FaInstagram } from "react-icons/fa";

const Contacto = () => {
  return (
    <div>
      <Scene2 />
      <div className="contacto-container">
        <h1 className="contacto-titulo">Contacto</h1>
        <p>
          Si deseas solicitar un cuadro a medida, por favor contáctanos a través
          de Instagram:
        </p>
        <p>
          Instagram:{" "}
          <a href="https://www.instagram.com/lapalmito.art/">
            <FaInstagram /> @lapalmito.art
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contacto;
