import { useHistory } from 'react-router-dom';
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
      <div class="defileParent" style={{backgroundColor:"red"}}>
        <span class="defile" 
          data-text=" Ceci est un projet pédagogique conçu et développé par les étudiants de M2 Ingénierie des Systèmes d'information- Université Mouloud Mammeri de Tizi-Ouzou - ALGERIE "> 
          Ceci est un projet pédagogique conçu et développé par les étudiants de M2 Ingénierie des Systèmes d'information- Université Mouloud Mammeri de Tizi-Ouzou - ALGERIE
       </span>
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