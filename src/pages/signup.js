import React, { useEffect } from "react";
import { useState } from "react";
import validation from "./validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Google , Facebook } from "react-bootstrap-icons";
import { Redirect, NavLink , Link} from 'react-router-dom';
import { GridLoader ,BarLoader } from 'react-spinners';
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai';
import Disconnected from '../profil/Disconnected';
import { loginUser } from "../profil/Firebase/firebase";
import { Checkbox } from "@mui/material";
import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  getAuth
} from "firebase/auth";
import { auth, db ,setDoc } from "../profil/Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import routeApi from "../api/routes";
import jwtDecode from 'jwt-decode';
import "../App.css";


const useStyles = makeStyles((theme)=> ({
  Container: {
      position:"auto",
      top:"0",
      
      color:"white",
     
      // [theme.breakpoints.up("sm")]:{
      //     backgroundColor: "#19A8D9",
      // color:"white",
      //     border: "1px solid #ece7e7"
      // }
  
  },
  item:{
      display:"flex",
      alignItems: "center",
      marginBottom:theme.spacing(4),
      [theme.breakpoints.up("sm")]:{
          marginBottom:theme.spacing(3),
          cursor:"pointer"
      }
  },
  icon:{
    
      [theme.breakpoints.up("sm")]:{
          fontsize:"18px",
      }
  },
  
  text:{
      marginLeft: theme.spacing(2),
      fontWeight:600,
      [theme.breakpoints.down("sm")]:{
          display:"none",
          
      },
  },
  link:{
      // color:"royalblue",
      textDecoration: "none",
      
  }
  
  }));
  

export default function Sign() {
  const [Radio, setRadio] = useState({ genre: "" });
  const [emails, setemails] = useState([]);
  const [dam, setdam] = useState({})
  const [values, setValues] = useState({
    fullname: "",
    prénom: "",
    pseudo: "",
    email: "",
    password: "",
    password2: "",
    loading: false,
  });
  const [state ,setstate] = useState(false)
  const toggleBtn =(e) => {
    e.preventDefault();
  setstate(prevState => !prevState) ;
}
  const getemails = async () => {
    const result = await routeApi.emails();
    if (!result.ok) return console.log(result);

    setemails(result.data);
};

  const [errors, setErrors] = useState({});
  let history = useHistory();

  // const handlechange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  //   setErrors({});
  // };

  
  const [checked, setChecked] = useState(false);
 
  const handleChange = () => {
    setChecked(!checked);
  };

  const [uids, setuids] = useState([]);
  const getuids = async () => {
    const result = await routeApi.uids();
    if (!result.ok) return console.log(result);
  
    setuids(result.data);
  };

  const signInWithFacebook = async () => {
    getuids();
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('email');
    await signInWithPopup(auth, provider)
      .then( async (result) => {
        // localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        let infos = {
          email : result.user.email,
          nom: result._tokenResponse.firstName,
          prenom: result._tokenResponse.lastName,
          pseudo: result._tokenResponse.firstName,
          Displayname : result.user.displayName,
          imageUrl: result.user.photoURL,

          userId: result._tokenResponse.localId,
          
          isOnLign: true,
          createdat: new Date().toISOString(),
          bio: '',
          dateNaissance: 'Non renseignée',
          blk:[],

        }
        let token = result._tokenResponse.idToken;
        let RefToken = result._tokenResponse.refreshToken;
        let userId = result._tokenResponse.localId;


        if (uids.indexOf(infos.userId) !== -1){

          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `${RefToken}`);
          await updateDoc(doc(db, "Users", userId), { isOnLign: true });
          setTimeout(() => {

            history.push('/home');
          }, 3000);
          

          } else if (uids.indexOf(infos.userId) == -1) {

            let infos2 = {
              email : "",
              nom: result._tokenResponse.firstName,
              prenom: result._tokenResponse.lastName,
              pseudo: result._tokenResponse.firstName,
              Displayname : result.user.displayName,
              imageUrl: result.user.photoURL,
    
              userId: result._tokenResponse.localId,
              
              isOnLign: true,
              createdat: new Date().toISOString(),
              bio: 'aucune biographie fournie',
              dateNaissance: 'non renseignée',
              blk:[],
    
            }

            if(infos.email == null){

                    await setDoc(doc(db , "Users", infos.userId), infos2)
                    .then()
                    .catch((error) => {
                      console.log(error.message);
                    });
                    localStorage.setItem("FBIdToken", `Bearer ${token}`);
                    localStorage.setItem("RefToken", `${RefToken}`);
                    setTimeout(() => {
                      history.push('/home');
                    }, 3000); 
  
            }else{
              await setDoc(doc(db , "Users", infos.userId), infos)
              .then()
              .catch((error) => {
                console.log(error.message);
              });
              localStorage.setItem("FBIdToken", `Bearer ${token}`);
              localStorage.setItem("RefToken", `${RefToken}`);
              setTimeout(() => {
                history.push('/home');
            }, 3000); 
            }
             
                     
            };
        ;
        

        // console.log(result);
        // console.log(dataa);
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    getemails();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        let infos = {
          email : result.user.email,
          nom: result._tokenResponse.firstName,
          prenom: result._tokenResponse.lastName,
          pseudo: result._tokenResponse.firstName,
          Displayname : result.user.displayName,
          imageUrl: result.user.photoURL,

          userId: result._tokenResponse.localId,
          
          isOnLign: true,
          createdat: new Date().toISOString(),
          bio: 'aucune biographie fournie',
          dateNaissance: 'non renseignée',
          blk:[],

        }
        let token = result._tokenResponse.idToken;
        let RefToken = result._tokenResponse.refreshToken;
        let userId = result._tokenResponse.localId;

        if (emails.indexOf(infos.email) !== -1){

          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `${RefToken}`);
           await updateDoc(doc(db, "Users", userId), { isOnLign: true });
          setTimeout(() => {
            history.push('/home');
          }, 3000); 

          // sendPasswordResetEmail(auth, values.email)
          // .then(() => {
          //   console.log(`reset password successful to ${values.email}`);
          // })
          // .catch((error) => {
          //   console.log(`reset password error to ${values.email}`);
          // });
          } else if (emails.indexOf(infos.email) == -1) {
            setDoc(doc(db , "Users", infos.userId), infos)
            .then()
            .catch((error) => {
              console.log(error.message);
            });
            localStorage.setItem("FBIdToken", `Bearer ${token}`);
            localStorage.setItem("RefToken", `${RefToken}`);
            history.push('/home');
          }
        ;
        

        // console.log(result);
        // console.log(dataa);
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrors(validation(values));
    setValues({
      loading: true,
    });

    console.log(errors);

    if (!errors.fullname && !errors.prénom && !errors.email && !errors.password && !errors.password2 && !errors.pseudo) {

        if (emails.indexOf(values.email.toLocaleLowerCase()) !== -1){
          setErrors({email: "Email existant"});

        }
        else{
        
          const result = await routeApi.signup(values.email.toLocaleLowerCase(), values.password, values.password2, values.fullname, values.prénom, values.pseudo);
          if (result.ok){

              // const auth = getAuth();
              // sendEmailVerification(auth.currentUser)
              // .then((Response) => {
              // Email verification sent!
              // ...
              //  if(Response.emailVerified == true){
              //  }else{
              //   alert("etes vous sur que cette email existe ? ressayer SVP "); 
              //  }

              // }).catch((err) => {
              //   alert("problem !! ressayer SVP "+err);
              // });
            localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
            localStorage.setItem("RefToken", `${result.data.refresh_token}`)
            setValues({
              loading: false,

            });

            loginUser(values.email, values.password)
            .then((user) => {
              
              const auth = getAuth();
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  alert('Un email de vérification a été envoyé à votre boîte email');
                  // Email verification sent!
                  // ...
                });
              console.log(user);
            })
            .catch((error) => {
              console.log(error.message);
            });
            
           
            
            history.push("/home");

          }

      }
        
               setValues({
              fullname: "",
              prénom: "",
              pseudo: "",
              email: "",
              password: "",
              password2: "",
              
            });
   
  }
  setValues({
    fullname: "",
    prénom: "",
    pseudo: "",
    email: "",
    password: "",
    password2: "",
    
  });
  }; 

  useEffect(() => {
    getemails();
    getuids();
    
  }, []);

  const classes = useStyles();
  return (
    <div className="container">
      <div className="app-wrapper">
        <form className="form-wrapper">
          <div className="fullname">
            <div className="name">
              <input
                className="input"
                type="text"
                name="fullname"
                placeholder="Nom"
                value={values.fullname}
                onChange={e=>{setValues({...values, fullname:e.target.value}) ; setErrors({});}}
              

              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>

            <div className="prénom">
              <input
                className="input"
                type="text"
                name="prénom"
                placeholder="Prénom"
                value={values.prénom}
                onChange={e=>{setValues({...values, prénom:e.target.value}) ; setErrors({});}}
              />
              {errors.prénom && <p className="error">{errors.prénom}</p>}
            </div>
          </div>

          <div className="pseudo">
            <input
              className="input"
              type="text"
              name="pseudo"
              placeholder="pseudo"
              value={values.pseudo}
              onChange={e=>{setValues({...values, pseudo:e.target.value}); setErrors({});}}
            />
            {errors.pseudo && <p className="error">{errors.pseudo}</p>}
          </div>

          <div className="email">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={e=>{setValues({...values, email:e.target.value}) ; setErrors({});}}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="password">
            <input
              className="input"
              type= {state ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={values.password}
              onChange={e=>{setValues({...values, password:e.target.value}) ;setErrors({}); setdam({ in :"dd"})}}
            />
            <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
            {dam.in && <p className="texaaa"><p>Créez un mot de passe d’au moins 8 caractères avec au moins:</p>
            <p >1 lettre, 1 chiffre et 1 caractère spécial (!@#$%^&*)</p></p>}
            {errors.password && <p className="error">{errors.password}</p>}

          </div>
          <div className="password2">
            <input
              className="input"
              type={state ? "text" : "password"}
              name="password2"
              placeholder="Confirmation de mot de passe"
              value={values.password2}
              onChange={e=>{setValues({...values, password2:e.target.value}) ; setErrors({});}}
            />
            {/* <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button> */}
            {errors.password2 && <p className="error">{errors.password2}</p>}
          </div>
          <div className="radioButton">
            <div className="radio">
              <div className="borderr">
                <label className="Femme">Femme</label>
                <input
                  type="radio"
                  name="genre"
                  className="femme"
                  value="Femme"
                />
              </div>

              <div className="borderr">
                <label className="Homme">Homme</label>
                <input
                  type="radio"
                  name="genre"
                  className="homme"
                  value="Homme"
                />
              </div>
            </div>
          </div> 
          {errors.general && <p className="error">{errors.general}</p>}

          <div style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13, marginTop:15}}>
          
          <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
           label="Value"
           value={checked}
           onChange={handleChange}
          />
          
          <span style={{fontSize: 13,color:'#696969'}} >J'ai lu et approuvé les </span>  
            <NavLink  to="/" onClick={()=>{window.open('/Condition', '_blank')}} exact className="">
            <Typography style={{fontSize: 13, color:"#19A8d9"}}>Conditions d'utilisation</Typography>
            </NavLink>
         </div> 
          
          <div>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13}}>
           <span style={{fontSize: 13,color:'#696969', marginLeft:35}}> Consulter les  </span>
           <NavLink  to="/" onClick={()=>{window.open('https://stralingapp.net/Privacy', '_blank')}} exact className="">
             <Typography style={{fontSize: 13, color:"#19A8d9"}} >Politiques de confidentialité </Typography>
           </NavLink>
          </div>  

            <button disabled={!checked} className="submit" onClick={handleFormSubmit}>
              {" "}
              S'inscrire
            </button>
            
            <>
          { values.loading === true &&(
             <BarLoader size={4} color='royalblue'  />)
          }
          </>
            </div>

        
            {/* <div>
            
            <NavLink onClick={signInWithGoogle} to="/" exact className="">
                <Google  size={26}></Google><Typography >connecter avec google</Typography>
            </NavLink>
            </div> */}
            {/* <div>
            
            <NavLink onClick={signInWithFacebook} to="/" exact className="">
                <Facebook  size={26}></Facebook><Typography >connecter avec google</Typography>
            </NavLink>
            </div> */}

          
        {/* <div >
          <Container className={classes.Container}>
            <div className={classes.item}>
            <NavLink onClick={signInWithGoogle} to="/" exact className={classes.link}>
                 <Google  size={26}>  </Google>
            </NavLink>
            <NavLink style={{marginLeft: 10,}} onClick={signInWithGoogle} to="/" exact  className={classes.link}>
                <Typography >S'inscrire avec Google</Typography> 
            </NavLink>
            </div>

            <div className={classes.item}>
            <NavLink onClick={signInWithFacebook} to="/" exact className={classes.link}>
                 <Facebook  size={26}>  </Facebook>
            </NavLink>
            <NavLink style={{marginLeft: 10,}} onClick={signInWithFacebook} to="/" exact  className={classes.link}>
                <Typography >S'inscrire avec Facebook</Typography> 
            </NavLink>
            </div>

          </Container>
      </div>  */}
        </form>
      </div>
    </div>
  );
}