import './App.css';
import Appl from './pages/wis';
import Amel from './pages/amel';
import Blq from './components/bloque/blq';
import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch , useHistory} from 'react-router-dom';
import Prof from "./profil/prof";
import Messa from './Messages/Mess'
import Notifications from './components/Notifications/Notifications';
import OneP from './components/Notifications/notifications/pub';
import axios from 'axios';
import Privacy from './pages/privacy';


function App() {

  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Appl}/>
          <Route exact path='/home' component={Amel}/>
          <Route exact path="/profil/:idProfil" component={Prof} />
          <Route exact path="/Messagerie/:idMessage" component={Messa} />
          <Route exact path='/settings' component={Blq}/>
          <Route exact path='/Notifications' component={Notifications}/>
          {/* <Route exact path='/Appel/:idcaller/:idtocall' component={AppVID}/> */}
          <Route exact path="/post/:idpost" component={OneP} />
          <Route exact path="/Privacy" component={Privacy} />
        </Switch>
      </Router>
    </div>
  
  );
}

export default App;

