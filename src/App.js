import './App.css';
import Appl from './pages/wis';
import { io } from "socket.io-client";
import Amel from './pages/amel';
import Blq from './components/bloque/blq';
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch , useHistory} from 'react-router-dom';
import Prof from "./profil/prof";
import Messa from './Messages/Mess'
import Notifications from './components/Notifications/Notifications';
import OneP from './components/Notifications/notifications/pub';
import axios from 'axios';
import Privacy from './pages/privacy';
import jwtDecode from 'jwt-decode';
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import Condition from './condition';

// import Call from './appel/rendu'


function App() {


  const [calling, setCalling] = useState(false);
  let socket = useSocket("https://starlingsockets.herokuapp.com");
  const token = localStorage.getItem("FBIdToken");

  const decodedToken = token ? jwtDecode(token) : false;

  const startUp = async () => {
    
    socket.on("callingEvent", (data) => {
      //console.log("######");
      //console.log(decodedToken.user_id);
      //console.log(data.to);
      if (decodedToken.user_id == data.to) {
        setCalling(data);
      }
    });
  };

  useEffect(() => {
    if (!socket || !token) return;
    console.log("######");
    startUp();
  }, [socket, token]);


  return (



    <div className="App">
       {calling && token && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: 20,
            height: 70,
            justifyContent: "space-between",
            backgroundColor: "#020116",
            borderRadius: 10,
          }}
          className="homepopup"
        >
          <span
            style={{
              color: "#fff",
              width: 180,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {"Appel entrant"}
          </span>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <div
              onClick={() => {
                window.location.href =
                  "https://calls.stralingapp.net/room/" + calling.from;
              }}
              style={{
                display: "flex",
                height: 50,
                width: 50,
                marginRight: 10,
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1000,
                cursor: "pointer",
              }}
            >
              <ImPhone color={"#fff"} size={24} />
            </div>
            <div
              onClick={() => {
                setCalling(false);
              }}
              style={{
                display: "flex",
                height: 50,
                width: 50,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1000,
                cursor: "pointer",
              }}
            >
              <ImPhoneHangUp color={"#fff"} size={24} />
            </div>
          </div>
        </div>
      )}
      <Router>
        <Switch>
          <Route exact path='/' component={Appl}/>
          <Route exact path='/home' component={Amel}/>
          <Route exact path="/profil/:idProfil" component={Prof} />
          <Route exact path="/Messagerie/:idMessage" component={Messa} />
          <Route exact path='/settings' component={Blq}/>
          <Route exact path='/Notifications' component={Notifications}/>
          {/* <Route exact path='/appel' component={Call}/> */}
          <Route exact path="/post/:idpost" component={OneP} />
          <Route exact path="/Privacy" component={Privacy} />
          <Route exact path="/Condition" component={Condition} />
        </Switch>
      </Router>
    </div>
  
  );
}

export default App;


function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ["websocket"],
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, []);

  return socket;
}


