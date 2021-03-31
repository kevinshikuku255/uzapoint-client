import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from "react-router-dom";
import "./people.css";

import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Person({person}) {
 const {username, image, email, phonenumber, location, businessdescription} = person;
 const history = useHistory();
 const classes = useStyles();

 const toProfile = () =>{
     history.push(`/${username}`)
 }


 return (
  <div className="person_wrapper" onClick={toProfile} >
      <div className="person_header">
         <Avatar alt="avator" src={image} className={classes.large}/>
         <div className="person_contact">
            <h4>{username}</h4>
            <p>{email}</p>
            <p>{phonenumber}</p>
         </div>
      </div>
      <div className="peron_more" >
       <p>{businessdescription}</p> <br/>
       {location && ( <div> <h6>Located</h6> <p>{location}</p> </div> )}


      </div>
  </div>
 )
}

export default Person
