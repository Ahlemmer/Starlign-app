import React from 'react'
import {  Avatar, Grid, Paper } from "@material-ui/core";



const Comment =(props) => {
    return (
      <div>
       
        <Paper style={{ padding: "10px 10px", marginTop: 10 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={props.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{props.nom}</h4>
              <p style={{ textAlign: "left" }}>
              {props.comment}
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                {props.dateComment}
              </p>
            </Grid>
          </Grid>
        </Paper>
       
      </div>

    )
}

  export default Comment