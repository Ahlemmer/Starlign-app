import React from "react";
import "./Popup.css";
import { useState } from "react";
import Popup1 from "./Popup1";

const Popup = (props) => {
  const [values, setValues] = useState({
    emaile: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handlechange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
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
          <h2>Rechercher votre compte Starling</h2>
          <input
            className="Input"
            type="text"
            name="email"
            placeholder="Entrer votre adresse email..."
            value={values.emaile}
            
            onChange={handlechange}
          />
          {/*<button className="btns"  >Rechercher</button>*/}

          <button className="" onClick={togglePopup}>
            Rechercher
          </button>

          {isOpen && <Popup1 handleClose={togglePopup} />}
        </div>
      </div>
    </div>
  );
};

export default Popup;
