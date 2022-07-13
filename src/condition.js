import { makeStyles } from '@material-ui/core';
import React from 'react'




const useStyles = makeStyles((theme)=> ({
    right:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        },
    },
}));


export default function Condition() {


    const classes = useStyles();
    return (
     <div>
      <h1>Terms of use</h1>
      <p>Last updated : March 01, 2022</p>
       <p>
         <strong>STARLING Social Network</strong>  is the result of a pedagogical project, designed and implemented by Master degree students (M2 ISI) of  Information Systems Engineering – Computer Science Department – University Mouloud Mammeri of Tizi Ouzou – ALGERIA. 
         <br/><br/>
         <strong>THIS IS NOT A PROFESSIONAL NOR A COMMERCIAL APPLICATION.</strong> 
         <br/><br/>
         Please do note that this is a test platform, and that your subscription or your connection is <span style={{textDecoration:"underline"}}>exclusively under your own responsibility</span> . 
         Authors do not guarantee any protection or any security to any information you decide to share or to publish on this platform.
       </p>
       <br/>
        <hr/>
        <br/>
             
        <h1>Conditions d'utilisation</h1>
       <p>Dernière Mise-à-jour : 01 Mars 2022</p>
       <p>
         <strong>Le réseau social STARLING</strong> est le résultat d’un projet pédagogique conçu et développé par les étudiant.e.s de M2 Ingénierie des Systèmes d’Information – Département d’Informatique – Université Mouloud MAMMERI de Tizi Ouzou – ALGERIE
         <br/><br/>
         <strong>CECI N’EST PAS UNE APPLICATION PROFESSIONNELLE NI COMMERCIALE.</strong> 
         <br/><br/>
         Veuillez noter que ceci est une plate-forme de test, et que votre inscription est <span style={{textDecoration:"underline"}}>exclusivement sous votre propre responsabilité</span>. Les auteurs ne garantissent ni la protection ni la sécurité de toute information que vous décidez de partager ou de publier sur cette plate-forme.
      </p>

     </div>
    )
}
