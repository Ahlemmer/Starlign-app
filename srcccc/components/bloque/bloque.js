import React, { useEffect } from "react";

import { Avatar, Button } from "@material-ui/core";

import { useRef, useState } from "react";

import routeApi from "../../api/routes";

import './bloqué.css'

export default function Feed () {
    const token = localStorage.getItem("FBIdToken");
    const [bloque, setbloque] = useState(false);
    const [successRate, setSuccessRate] = useState(0);

    const getbloque = async () => {
        const token = localStorage.getItem("FBIdToken");
    
        setbloque(false);
    
        // console.log('######')
        const result = await routeApi.getbloque(token);
        if (!result.ok) {
          console.log(result);
          setSuccessRate(successRate + 1);
        } else {
          //console.log(result.data)
          setbloque(result.data);
        }
      };
      const refresh=() => {
        getbloque();
      }


      useEffect(() => {
        
        getbloque();
      }, []);

    return (
        <div className="container">

         <h3>Liste des Personnes bloquées</h3>
    

         
                    
        

        {bloque &&
                bloque.map((bloque, index) => (
            <div className="user" >

                
                <div className="infos" >
                {bloque && <Avatar src={bloque.imageUrl} />}
    
                        <div className="info" >
                        <span>{bloque &&bloque.Displayname}</span>
                        <p>{bloque && "@" +bloque.pseudo}</p>
                        </div>
    
                        <button onClick={() => {
                        const result =  routeApi.debloquer(token, bloque.userId);
                        if (!result.ok) {
                            alert("vous debloquer maintenemt @"+bloque.pseudo)
                          console.log(result);
                          refresh();
                        } else {
                            console.log("error");
                        }
                    }} className='follow' >débloquer</button>
                 </div>
                 
            </div>
            ))}     
           
        </div>
    )
}

{/* <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>
               
                 
                 <div className="infos" >
                        <img src="\starling.png" />
    
                        <div className="info" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >débloquer</button>
                 </div>  */}
