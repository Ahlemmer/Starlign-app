import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { dateParser } from "./Date/Utils";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { IoGiftOutline } from "react-icons/io5";
import { GridLoader } from 'react-spinners';

import { FiEdit3 } from "react-icons/fi";
import { updateDoc, user } from "./Firebase/firebase";
import { useHistory } from "react-router-dom";
 
toast.configure();
function MyInformation({ userData }) {
  const [EditBirthday, setEditBirthday] = useState(false);
  const [birthday, setbirthday] = useState("");
  const redirection = useHistory();

  const handleChange = (e) => {
    setbirthday(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updateDoc(user(userData.userId), { dateNaissance: birthday })
      .then(() => {
        toast.success("Modifification effectué avec succès", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          
        });
        redirection.push(`/profil/${userData.userId}`);
        setEditBirthday(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const displayEditBirthday =
    EditBirthday === false ? (
      <div className="col col-lg-12 ">
        <p
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#696969",
          }}
        >
          <IoGiftOutline
            style={{ color: "#19A8D9", fontSize: "20px", marginBottom: "10px" }}
          />{" "}
          Anniversaire : { userData.dateNaissance  !== "non renseignée" ? dateParser (userData.dateNaissance) 
                :userData.dateNaissance }
          <button
            className="btn btn-default"
            onClick={() => setEditBirthday(true)}
          >
            {" "}
            <FiEdit3
              style={{
                color: "#19A8D9",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            />{" "}
          </button>
        </p>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col col-lg-auto">
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label" >
              Anniversaire:
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                placeholder="birthday ..."
                value={birthday}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col col-lg-auto ">
            <div style={{ marginTop: "25px" }}>
              <button style={{backgroundColor:"#19A8D9" ,borderColor:"#19A8D9",color:"white",borderRadius:"20px"}}
              type="submit" className="btn btn-primary">
                Valider
              </button>
            </div>
          </div>
          <div className="col col-lg-auto">
            <div style={{ marginTop: "25px" }}>
              <button style={{backgroundColor:"#19A8D9" ,borderColor:"#19A8D9",color:"white",borderRadius:"20px"}}
              
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  setEditBirthday(false);
                  setbirthday("");
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </form>
    );

  return (
    <div className="row mt-3">
      {displayEditBirthday}
      <div className="col col-lg-12 ">
        <p
           style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#696969",
          }}
        >
          <BsFillCalendarDayFill
            style={{ color: "#2980B9", fontSize: "28px", marginBottom: "10px" }}
          />{" "}
          Rejoint le : {dateParser(userData.createdat)}
        </p>
      </div>
    </div>
  );
}

export default MyInformation;
