import React from 'react'
import '../index.css'
import { Link } from "@material-ui/core";
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useState } from 'react';
import validation from "../validation";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { Alert } from "@blueprintjs/core";

export default function Login() {
toast.configure();
let history = useHistory();
    const token = localStorage.getItem("FBIdToken");

    const [state ,setstate] = useState(false)
const toggleBtn =(e) => {
    e.preventDefault();
  setstate(prevState => !prevState) ;
}


const [values, setValues] = useState({
    password: "",
    password2: "",
});

const [errors, setErrors] = useState({});


const handlechange = (event) =>{
    setErrors({});
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    } );
   
        
    
    

};



const handleFormSubmit = (event) =>{
event.preventDefault();
setErrors(validation(values));
const tokenn = localStorage.FBIdToken;
const token =tokenn.split('Bearer ')[1];
if (!errors.password2 && !errors.password && !errors.code){
    let data = {
        idToken: token,
        password: values.password,
        returnSecureToken: true, 
    }
    try {
        var idd;
           axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                        localStorage.removeItem("FBIdToken");
                        localStorage.removeItem("RefToken");
                        history.push(`/home`);
                        
                        toast.success("Modifification effectué avec succès", {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,}) 
                                               
                        
                    }).catch((err) => {
                        setErrors({message : "Une erreur c'est produit , essayer de se reconnecter SVP"});
                        setValues({
                            password: "",
                            password2: "",
                        });
                      });
                  
 
    } catch (error) {
        console.log(error);
    }


}else{
    setValues({
        password: "",
        password2: "",
    });
}

};

    return (
        
              <div className="contenu">
                        <h6 className='texts' style={{color: "red"}}>Après le changement de votre mot de passe vous serez automatiquement déconnecté ;
                         Et rediriger vers la page de connexion pour vous reconnecter à nouveau</h6>
                        <h3 className="titre">Saisissez votre nouveau mot de passe </h3>
                        <p className="text">Créez un mot de passe d’au moins 8 caractères.
                        Le mot de passe doit inclure au moins 1 lettre, 1 
                        chiffre et 1 caractère spécial (!@#$%^&*)</p>
                       {/*<input className="Input" type="password" name="email"  placeholder="Nouveau mot de passe  " />*/ } 
                       <input className="Input" type= {state ? "text" : "password"} name="password" placeholder="Mot de passe" value={values.password} onChange={handlechange} />

                                <button className='Btn' onClick={toggleBtn}>
                                        {state ? <AiOutlineEyeInvisible /> :
                                        <AiOutlineEye/>  }
                                    </button>
                         {errors.password && <p className="error">{errors.password}</p>}    


                        {/* <input className="Input1" type="password" name="email"  placeholder="Confirmer mot de passe  " /> */}

                        <input className="Input1" type= {state ? "text" : "password"} name="password2" placeholder="Confirmation de mot de passe" value={values.password2} onChange={handlechange} />
                         
                            <button className='Btn' onClick={toggleBtn}>
                                    {state ? <AiOutlineEyeInvisible /> :
                                    <AiOutlineEye/>  }
                                </button>
                        {errors.password2 && <p className="error">{errors.password2}</p>} 
                        {errors.message && <p className="error">{errors.message}</p>}
                        <div className="fotter1">
                            <button className="bouton"><Link  underline="none" color="inherit" href ="#">Annuler</Link></button>
                            <button className='bouton1' onClick={handleFormSubmit}>Terminé</button>
                        </div>
             </div>
    )
}
