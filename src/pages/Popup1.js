import React from "react";
import "./Popup.css";
import { useState } from "react";


const Popup = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div className="popup-box">
      <div className="box">
        <button className="btn-close" onClick={props.handleClose}>
          x
        </button>
        <div className="contenu">
          <img
            src="\starling.png"
            style={{
              width: "10%",
              height: "5rem",
              objectFit: "fill",
              display: "block",
              margin: "auto",
            }}
          />
          <h2>Vérifiez votre adresse email</h2>
          <p className="text">
            Vous recevrez un lien sur votre email pour pouvoir réinitialiser le mot
            de passe de votre compte.

          </p>
            <p className="texaaa"><p>Créez un mot de passe d’au moins 8 caractères.</p>
            <p style={{marginTop:"5px"}}>qui inclut au moins:1 lettre, 1 chiffre</p> 
            <p style={{marginTop:"5px"}}>et 1 caractère spécial (!@#$%^&*)</p></p>
          

          
        </div>
      </div>
    </div>
  );
};

export default Popup;
