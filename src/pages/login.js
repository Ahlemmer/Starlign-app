import React, { useEffect } from "react";
import { BiCheckbox, BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import validation from "./validation";
import axios from "axios";
import Privacy from './privacy';
import { Link, useHistory ,NavLink  } from "react-router-dom";
import { loginUser } from "../profil/Firebase/firebase";
import { Google ,Facebook } from "react-bootstrap-icons";
import { GridLoader ,BarLoader } from 'react-spinners';
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  getPhoneNumberFromUserInput,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db ,setDoc } from "../profil/Firebase/firebase";
import Popup1 from "./Popup1";
import { Badge, Container, createTheme, List, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import routeApi from "../api/routes";
import jwtDecode from 'jwt-decode';
import './login.css';
import { Checkbox } from "@mui/material";



const useStyles = makeStyles((theme)=> ({
  Container: {
      position:"auto",
      top:"0",
      paddingTop: theme.spacing(6),
      color:"white",
      marginLeft: theme.spacing(6),
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
      
  },
  check:{
   fontSize:"1rem"
  }
  }));
  
  

export default function Login() {


  const [emails, setemails] = useState([]);
  const [checked, setChecked] = useState(false);
 
  const handleChange = () => {
    setChecked(!checked);
  };
  const getemails = async () => {
    const result = await routeApi.emails();
    if (!result.ok) return console.log(result);

    setemails(result.data);
};

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [state ,setstate] = useState(false)
  const toggleBtn =(e) => {
    e.preventDefault();
  setstate(prevState => !prevState) ;
}

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [uids, setuids] = useState([]);
  const getuids = async () => {
    const result1 = await routeApi.getuids();
    if (!result1.ok) return console.log(result1);

    setuids(result1.data);
};

  let history = useHistory();

  const togglePopup = (event) => {
    event.preventDefault();
    
    if (!values.email ){
      setErrors({email: "Veuillez saisir un email"});
    }else{
      if (emails.indexOf(values.email) !== -1){
      setIsOpen(!isOpen);
      sendPasswordResetEmail(auth, values.email)
      .then(() => {
        console.log(`reset password successful to ${values.email}`);
      })
      .catch((error) => {
        console.log(`reset password error to ${values.email}`);
      });
      }
    else{
      setErrors({email:"Vous n'avez pas de compte avec cet email" });
      
    }

      
    }
  
  };
  const handlechange = (event) => {
    setValues({
      loading: false,
    });
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setErrors({});
  };

  const handleFormSubmit = async (event) => {
    setValues({
      loading: true,
    });
    event.preventDefault();
    setErrors(validation(values));
    

    const userData = {
      email: values.email,
      password: values.password,
    };

    if (emails.indexOf(values.email.toLocaleLowerCase()) !== -1){
      loginUser(values.email, values.password)
      .then((user) => {
        // console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });

      const result = await routeApi.login(values.email.toLocaleLowerCase(), values.password);
      if (result.ok){
    
        localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        localStorage.setItem("RefToken", `${result.data.refresh_token}`)
        setValues({
          loading: false,
        });
        history.push("/home");
      }else{
        setErrors({ general: "Mot de passe incorrect" });    
      }
      }
    else{
     setErrors({email:"Vous n'avez pas de compte avec cet email" });
    }
    // axios
    //   .post("/login", userData)
    //   .then((res) => {
    //     console.log(res.data);
    //     localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
    //     localStorage.setItem("RefToken", `${res.data.refresh_token}`)
    //     setValues({
    //       loading: false,
    //     });
    //     history.push("/home");
    //   })
    //   .catch((err) => {
    //     setErrors(err.response.data);
    //   });

      setValues({
        email: "",
        password: "",
      });
  };


  


  const signInWithFacebook = async () => {
    getuids();
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('email');
    await signInWithPopup(auth, provider)
      .then( async (result) => {
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

        if (uids.indexOf(userId) !== -1){

          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `${RefToken}`);
          await updateDoc(doc(db, "Users", userId), { isOnLign: true });
          setTimeout(() => {
            history.push('/home');
          }, 3000); 

          } else if (uids.indexOf(userId) == -1) {

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
        
        if (emails.indexOf(infos.email) !== -1){

          await updateDoc(doc(db, "Users", infos.userId), {
            isOnLign: true,
          });
          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `${RefToken}`);
           
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

  useEffect(() => {
    getemails();
    getuids();
    
  }, []);

  useEffect(() => {
    const tokenn = localStorage.getItem("FBIdToken");
    if (tokenn){
      history.push('/home')
        const token = localStorage.FBIdToken;
        if(token){
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 > Date.now()){
            history.push('/home')
        } 
        }
    }
    
  }, []);

  const classes = useStyles();
  return (
    <div>

      <form className="form" >
        <div className="input">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handlechange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type={state ? "text" : "password"}
            name="password"
            placeholder="Mot de passe"
            value={values.password}
            onChange={handlechange}
          />
                      <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}
          
      
         

        <div className="fotter">
          <div>
            <button className="btns" onClick={handleFormSubmit}>
               Connexion
            </button>
          </div>

 
          <>
          { values.loading === true &&(
           <BarLoader size={4} color='royalblue'  />)
          }

        {isOpen && <Popup1 handleClose={togglePopup} />}

        <div  style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13}}>
          <span style={{fontSize: 13,color:'#696969'}}>Mot de passe oublié? </span>
          <NavLink onClick={togglePopup} to="/" exact className="">
            <Typography style={{fontSize: 13, color:"#19A8d9"}}>Réinitialiser</Typography>
          </NavLink>
        </div>  
        
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize: 13, marginLeft:20, marginBottom:10}}>
         <span style={{fontSize: 13,color:'#696969'}}> Consulter les  </span>
          <NavLink  to="/" onClick={()=>{window.open('https://stralingapp.net/Privacy', '_blank')}} exact className="">
           <Typography style={{fontSize: 13, color:"#19A8d9"}} >Politiques de confidentialité </Typography>

          </NavLink>
          <br/>
          <span style={{fontSize: 13,color:'#696969'}}> et les </span>
          <NavLink  to="/" onClick={()=>{window.open('/Condition', '_blank')}} exact className="">
            <Typography style={{fontSize: 13, color:"#19A8d9"}}>Conditions d'utilisation</Typography>
            </NavLink>
        </div> 

        </>
 
        </div>
        {/* <div className="lienn" >
           <NavLink onClick={signInWithGoogle} to="/" exact className="">
                <Google  size={26}></Google>
                <Typography >conntinuer avec google</Typography>
          </NavLink>
           </div> */}

          {/* <div style={{marginLeft:"30px"}}>
           <Container className={classes.Container}>
             <div style={{ width: '300px'}} className={classes.item}>
               <NavLink onClick={signInWithGoogle} to="/" exact className={classes.link}>
                 <Google  size={26}>  </Google>
               </NavLink>
               <NavLink style={{marginLeft: 10,}} onClick={signInWithGoogle} to="/" exact  className={classes.link}>
                <Typography >Continuer avec Google</Typography> 
               </NavLink>
             </div>

             <div style={{ width: '300px'}} className={classes.item} >
               <NavLink onClick={signInWithFacebook} to="/" exact className={classes.link}>
                 <Facebook  size={26}>  </Facebook>
               </NavLink>
               <NavLink style={{marginLeft: 10, width: '200px'}} onClick={signInWithFacebook} to="/" exact  className={classes.link}>
                 <Typography >Continuer avec Facebook</Typography> 
               </NavLink>
             </div>
           </Container>
           
        </div>  */}
      </form>
    </div>
  );
}
