import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { FiEdit } from "react-icons/fi";
import { user, updateDoc, useAuth } from "../Firebase/firebase";
import { useHistory } from "react-router-dom";
import routeApi from "../../api/routes";
import "../profile.css";
import validation from "./validation";


toast.configure();
const Navbar = ({ userData }) => {
  const currentUser = useAuth();
  const redirection = useHistory();

  const [modifierInfo, setModifierInfo] = useState(false);

  const data = {
    nom: userData.nom,
    prenom: userData.prenom,
    pseudo: userData.pseudo,
  };
  const [editInfo, setEditInfo] = useState(data);

  const handleChange = async (e) => {
    setEditInfo({ ...editInfo, [e.target.id]: e.target.value });
  };

  const { nom, prenom, pseudo } = editInfo;
  const [errors, setErrors] = useState({});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const values = {
        nom: nom,
        prenom: prenom,
        pseudo: pseudo,
      };
      const token = localStorage.getItem("FBIdToken");
      const test = validation(values);
      setErrors(test);
  
      
      console.log(test);
  
  
  
      if (nom.trim() !== "" && prenom.trim() !== "" && pseudo.trim() !== "") {
        const information = {
          nom: nom.trim(),
          prenom: prenom.trim(),
          pseudo: pseudo.trim(),
        };
        
        console.log(test);
        if (!test.nom && !test.prenom){
           
            const result = await routeApi.setinfos(token, information.nom , information.prenom ,information.pseudo )
            if (result.ok) {
              try {
                
                toast.success("Modifification effectuée avec succès", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
  
              setModifierInfo(false);
              redirection.push(`/profil/${userData.userId}`);
              window.location.reload(`/profil/${userData.userId}`);
  
              } catch (error) {
                console.log(error);
              }
  
            } else {
              toast.warn("Erreur veuillez réesayer ", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                
              });
            }
  
        }
        
        
      } else {
        toast.warn("Veuillez remplir les champs correctement", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          
        });
      }
  
      
      //  if (don == true){
      //   redirection.push(`/profile/${userData.userId}`);
      //   window.location.reload(`/profile/${userData.userId}`);}
    };
    


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("FBIdToken");

  //   if (nom.trim() !== "" && prenom.trim() !== "" && pseudo.trim() !== "") {
  //     const information = {
  //       nom: nom.trim(),
  //       prenom: prenom.trim(),
  //       pseudo: pseudo.trim(),
  //     };
  //     const result = await routeApi.setinfos(
  //       token,
  //       information.nom,
  //       information.prenom,
  //       information.pseudo
  //     );
  //     if (result.ok) {
  //       try {
  //         toast.success("Modifification effectué avec succès", {
  //           position: "top-left",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });

  //         redirection.push(`/profil/${userData.userId}`);
  //         window.location.reload(`/profil/${userData.userId}`);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       toast.warn("erreur reesayer svp", {
  //         position: "top-left",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   } else {
  //     toast.warn("Veillez remplir les champs correctement", {
  //       position: "top-left",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }

  //   setModifierInfo(false);
  //   //  if (don == true){
  //   //   redirection.push(`/profile/${userData.userId}`);
  //   //   window.location.reload(`/profile/${userData.userId}`);}
  // };

  const afficherEdit =
    modifierInfo === false ? (
      <div
        className="col col-lg-1 "
        // style={{  marginTop: "5px" }}
      >
        {currentUser === null ? (
          ""
        ) : currentUser.uid === userData.userId ? (
          <button
            className="btn_edit "
            onClick={() => {
              setModifierInfo(true);
              setEditInfo(data);
            }}
          >
            <FiEdit style={{ fontSize: "20px" }} />
          </button>
        ) : (
          ""
        )}
      </div>
    ) : (
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div className="row" style={{ marginLeft: 10 }}>
          <div className="col col-lg-3">
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom :
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                placeholder="Nom ..."
                value={nom}
                onChange={handleChange}
                
              />
              {errors.nom && <p className="error">{errors.nom}</p>}
 

            </div>
          </div>
          <div className="col col-lg-3">
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom :
              </label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                placeholder="Prenom ..."
                value={prenom}
                onChange={handleChange}
              />
              {errors.prenom && <p className="error">{errors.prenom}</p>}
 

            </div>
          </div>
          <div className="col col-lg-3">
            <div className="mb-3">
              <label htmlFor="pseudo" className="form-label">
                Pseudo :
              </label>
              <input
                type="text"
                className="form-control"
                id="pseudo"
                placeholder="Pseudo ..."
                value={pseudo}
                onChange={handleChange}
              />
            
 

            </div>
          </div>
          <div className="col col-lg-auto ">
            <div style={{ marginLeft: "30px", marginTop: "30px" }}>
              <button
                style={{
                  backgroundColor: "#19A8D9",
                  marginLeft: "-35px",
                  borderColor: "#19A8D9",
                  color: "white",
                  borderRadius: "20px",
                }}
                type="submit"
                className="btn btn-primary"
              >
                valider
              </button>
            </div>
          </div>
          <div className="col col-lg-auto">
            <div style={{ marginLeft: "-10px", marginTop: "30px" }}>
              <button
                style={{
                  backgroundColor: "#19A8D9",
                  borderColor: "#19A8D9",
                  width: "100%",
                  color: "white",
                  borderRadius: "20px",
                }}
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  setModifierInfo(false);
                  setEditInfo(data);
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
    <nav
      className=" bg-light "
      style={{
        height: "  100px",
        paddingTop: "10px",
        backgroundColor: "rgb(236, 247, 254)",
      }}
    >
      <div className="row">
        <div className="col col-lg-11">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 15,
              marginTop: 10,
            }}
          >
            {modifierInfo === false ? (
              <>
                <span
                  style={{
                    fontWeight: "bold",
                    //fontFamily: "castellar",
                    fontSize: "25px",
                    // textShadow:"6px 2px 4px grey",
                    color: "black",
                  }}
                >
                  {" "}
                  {userData.nom} {userData.prenom}
                </span>

                <span
                  style={{
                    // marginBottom: "20px",
                    display: "inline-block",
                    color: "grey",
                    fontStyle: "italic",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  @{userData.pseudo}
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {afficherEdit}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"
// import { Link } from "react-router-dom";
// import { ArrowLeft } from "react-bootstrap-icons";
// import { FiEdit } from "react-icons/fi";
// import { user, updateDoc, useAuth } from "../Firebase/firebase";
// import { useHistory } from "react-router-dom";
// import routeApi from "../../api/routes";
// import "../profile.css"

// toast.configure();
// const Navbar = ({ userData }) => {

//   const currentUser = useAuth();
//   const redirection = useHistory();

//   const [modifierInfo, setModifierInfo] = useState(false);

//   const data = {
//     nom: userData.nom,
//     prenom: userData.prenom,
//     pseudo: userData.pseudo,
//   };
//   const [editInfo, setEditInfo] = useState(data);

//   const handleChange = async (e) => {
//     setEditInfo({ ...editInfo, [e.target.id]: e.target.value });
//   };

//   const { nom, prenom, pseudo } = editInfo;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("FBIdToken");

//     if (nom.trim() !== "" && prenom.trim() !== "" && pseudo.trim() !== "") {
//       const information = {
//         nom: nom.trim(),
//         prenom: prenom.trim(),
//         pseudo: pseudo.trim(),
//       };
//       const result = await routeApi.setinfos(token, information.nom , information.prenom ,information.pseudo )
//       if (result.ok) {

//         try {
//           toast.success("Modifification effectué avec succès", {
//           position: "top-left",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         })

//          redirection.push(`/profil/${userData.userId}`);
//          window.location.reload(`/profil/${userData.userId}`);

//         } catch (error) {
//           console.log(error);
//         }

//       } else {
//         toast.warn("erreur reesayer svp", {
//           position: "top-left",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,

//         });
//       }

//     } else {
//       toast.warn("Veillez remplir les champs correctement", {
//         position: "top-left",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,

//       });
//     }

//     setModifierInfo(false);
//     //  if (don == true){
//     //   redirection.push(`/profile/${userData.userId}`);
//     //   window.location.reload(`/profile/${userData.userId}`);}
//   };

//   const afficherEdit =
//     modifierInfo === false ? (

//         <div
//           className="col col-lg-1 "
//           // style={{  marginTop: "5px" }}
//         >
//           {currentUser === null ? (
//             ""
//           ) : currentUser.uid === userData.userId ? (
//             <button
//               className="btn_edit "
//               onClick={() => {setModifierInfo(true);setEditInfo(data)}}
//             >
//               <FiEdit style={{ fontSize: "20px" }} />
//             </button>
//           ) : (
//             ""
//           )}
//         </div>

//     ) : (
//       <form onSubmit={handleSubmit} style={{marginBottom:"30px"}}>
//         <div className="row">
//           <div className="col col-lg-3">
//             <div className="mb-3">
//               <label htmlFor="non" className="form-label">
//                 Nom :
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="nom"
//                 placeholder="Nom ..."
//                 value={nom}

//                 onChange={handleChange}
//               />
//             </div>
//             </div>
//           <div className="col col-lg-3">
//             <div className="mb-3">
//               <label htmlFor="prenom" className="form-label">
//                 Prénom :
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="prenom"
//                 placeholder="Prenom ..."
//                 value={prenom}

//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="col col-lg-3">
//             <div className="mb-3">
//               <label htmlFor="pseudo" className="form-label">
//                 Pseudo :
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="pseudo"
//                 placeholder="Pseudo ..."
//                 value={pseudo}

//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="col col-lg-auto ">
//             <div style={{ marginTop: "30px" }}>
//               <button  style={{backgroundColor:"#19A8D9" , borderColor:"#19A8D9",width: "65%" ,color:"white",borderRadius:"20px"}}
//               type="submit" className="btn btn-primary" >
//                 valider
//               </button>
//             </div>
//           </div>
//           <div className="col col-lg-auto">
//             <div style={{ marginLeft: "-140px" ,
//                             marginTop : "-20px"}}>
//               <button style={{backgroundColor:"#19A8D9" , borderColor:"#19A8D9",width: "55%" ,color:"white",borderRadius:"20px"}}
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={() => {
//                   setModifierInfo(false);
//                   setEditInfo(data);
//                 }}
//               >
//                 annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     );

//   return (
//     <nav
//       className=" bg-light "
//       style={{ height: "69px",paddingTop:"10px", backgroundColor:"rgb(236, 247, 254)"}}
//     >
//       <div className="row">
//        <div className="col col-lg-11">
//        <span

//           style={{ fontSize: "30px",
//             lineHeight:"70%" }}
//         >
//           {modifierInfo === false ? (
//             <Link className="navbar-brand" to="/home">
//               <ArrowLeft className="btn_fi" />
//               <span
//                 style={{
//                   fontWeight: "bold",
//                   //fontFamily: "castellar",
//                   fontSize: "25px",
//                  // textShadow:"6px 2px 4px grey",
//                   color: "black",

//                 }}
//               >  {userData.nom} {userData.prenom}

//               </span>
//               <br  />
//               <span
//                 style={{
//                   // marginBottom: "20px",
//                   display: "inline-block",
//                   color:"grey",
//                   marginLeft:"30px",
//                   fontStyle:"italic",
//                   fontSize:"20px"

//                 }}
//               >   @{userData.pseudo}

//               </span>
//             </Link>
//           ) : (
//             ""
//           )}
//         </span>
//        </div>

//           {afficherEdit}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
