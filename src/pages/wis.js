import { NavLink, useHistory } from 'react-router-dom';
import '../App.css';
import Left from './Left';
import SignInOutContainer from './Right'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { useEffect, useState } from 'react';



function Appl() {
  let history = useHistory();
  const [Loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("FBIdToken");
    const refresh_token = localStorage.getItem("RefToken");
    if (!token){
        history.push('/')
    }else{
        let authenticated;
        const token = localStorage.FBIdToken;
        const refresh_token = localStorage.RefToken;
        const decodedToken = jwtDecode(token);
        if((decodedToken.exp * 1000 - Date.now()) < 600000){
            try { 
                let data = {
                    grant_type:"refresh_token",
                    refresh_token: refresh_token 
                }
                axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                    localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
                    localStorage.setItem("RefToken", `${res.data.refresh_token}`);   
                })
                authenticated = false;
                
                } catch (error) {
                    console.log(error);
                }
        } else {
            authenticated = true;
        }
        
    }
  return  setLoading(false)
  }, []);
  return (
    <div className="App">
      
        <div className="marquee">
         <div className=" marquee-container" style={{whiteSpace: "nowrap", '--pause-on-hover':'running', '--pause-on-click':'running'}}>
           <div className="overlay" style={{"--gradient-color":"rgba(255, 255, 255, 1),rgba(255, 255, 255, 0)", "--gradient-width":"200px"}}></div>
           
            <div className="marquee" style={{"--play":"running", "--direction":"normal" ,"--duration":"50s" ,"--delay":"0s" ,"--iteration-count":"infinite", marginLeft:20}}>
              <div style={{width:30, height:20}}></div> 
               <p style={{fontSize:25, color:'#19A8d9'}}> Ceci est un projet pédagogique conçu et développé par
                    les étudiants de M2 Ingénierie des Systèmes d'information -
                    Université Mouloud Mammeri de Tizi-Ouzou - ALGERIE 
                    
                    VEUILLEZ PRENDRE CONNAISSANCE DES <span style={{fontSize:25, textDecoration:"underline"}} onClick={()=>{window.open('/Condition', '_blank')}}> CONDITIONS D'UTILISATION </span> 
                    AVANT DE VOUS INSCRIRE ET DE CREER UN COMPTE |
               </p> 
               
              <p style={{fontSize:25, color:'#19A8d9'}}> This is an educational project designed and developed by
                    M2 Information Systems Engineering students -
                    Mouloud Mammeri University of Tizi-Ouzou - ALGERIA 
                    
                    PLEASE BE AWARE OF THE
                    <span style={{fontSize:25, textDecoration:"underline"}} onClick={()=>{window.open('/Condition', '_blank')}}> TERMS OF USE </span>
                    BEFORE YOU REGISTER AND CREATE AN ACCOUNT
               </p> 
            </div>
            <div className="marquee" style={{"--play":"running", "--direction":"normal" ,"--duration":"50s" ,"--delay":"0s" ,"--iteration-count":"infinite", marginLeft:20}}>
              
               <p style={{fontSize:25, color:'#19A8d9'}}> Ceci est un projet pédagogique conçu et développé par
                    les étudiants de M2 Ingénierie des Systèmes d'information -
                    Université Mouloud Mammeri de Tizi-Ouzou - ALGERIE 
                    
                    VEUILLEZ PRENDRE CONNAISSANCE DES <span style={{fontSize:25, textDecoration:"underline"}} onClick={()=>{window.open('/Condition', '_blank')}}> CONDITIONS D'UTILISATION </span> 
                    AVANT DE VOUS INSCRIRE ET DE CREER UN COMPTE |
               </p> 
               
              <p style={{fontSize:25, color:'#19A8d9'}}> This is an educational project designed and developed by
                    M2 Information Systems Engineering students -
                    Mouloud Mammeri University of Tizi-Ouzou - ALGERIA 
                    
                    PLEASE BE AWARE OF THE
                    <span style={{fontSize:25, textDecoration:"underline"}} onClick={()=>{window.open('/Condition', '_blank')}}> TERMS OF USE </span>
                    BEFORE YOU REGISTER AND CREATE AN ACCOUNT
               </p> 
            </div>
          </div>
       </div>
         
     <div className="Main" style={{ marginTop: 10}}>
       <div className="Left_Sidebar_Area">
         <Left/>
       </div>

       <div className="Right_Sidebar_Area">
          <SignInOutContainer/>
       </div>
     </div>
    </div>
  );
}

export default Appl;