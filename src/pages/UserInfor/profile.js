import React from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery}  from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import {Email, PhoneAndroid, LocationOn, WhatsApp} from '@material-ui/icons';

import OtherHeader from "../../components/Header/otherHeader";
import logo from "../../Assets/logo.png";
import cover from "../../Assets/cover.jpg"
import  './profile.css'

import {GET_USER } from '../../graphql/user';
import CustomFooter from "../../components/Footer/customFooter"
import { weekDay } from '../../Utils/date';
import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



/**Profile page */
const  Profile = ()  => {
 const path = useRouteMatch();
 const classes = useStyles();
 const name = path.params.username.split(':').pop();
 const history = useHistory()
//  const path = history.location.pathname


 const { data,loading} = useQuery(GET_USER,{
   variables:{
     username:name
   }
 });

if(loading){
  return <h5>Loading ...</h5>
}

const {username, fullname,location, posts, businessdescription, phone, email, image, coverImage, createdAt} = data.getUser;

const avator = image ?  image : logo;
const coverImg = coverImage ? coverImage : cover;
const weekday = weekDay(createdAt)


/* ------------------ Route links functions-------------------------------------------------------- */
 const itemsLink = () =>{
    history.push(`/profile/:${username}/items`)
 }


/* -------------------------------------------------------------------------- */


 return (
 <>
   <OtherHeader tag={username}/>
   <div className="profileContainer">
     <div className="coverImg"> <img  width="100%" alt="cover" height="100vh" src={coverImg}/> </div>
     <div className="avator">
          <Avatar alt="logo" src={avator} className={classes.large}/>
          <div>
              <p>{fullname ? fullname : username}</p>
              <p> Phone: {phone}</p>
              {email && <p> Email: {email}</p>}
          </div>
          {/* <div className="followButton">
             <button>Follow</button>
          </div> */}
     </div>

     <div className="profileContact" >
        <p style={{fontWeight:"bolder"}}>Contact information:</p>
        <ul>
           <a href={`tel:${phone}`} ><li> <PhoneAndroid/> <p>Direct call</p></li></a>
           <a href={`https://api.whatsapp.com/send?phone=${phone}`}> <li> <WhatsApp/> <p>WhatsApp</p></li> </a>
           <a href={`mailto:${email ? email : ""}`}> <li> <Email/> <p>Email</p> </li> </a>
        </ul>
     </div>
     <div className="profile_description">
       <b>Business Description:</b>
       <p>
          { businessdescription ? businessdescription :
            `Hi there  i am ${fullname ? fullname : username} and I am using windoshoppe.`}
       </p>
     </div>

     <div className="joine_date">
       <b> Joined:</b>
       {weekday}
     </div>


      <div className="location">
        <p className="bold">Direction:</p>
        <p><LocationOn/></p> <p>{location ? location : "Tom Moya University Collage"}</p>
      </div>

      <div className="items" >
        <ul>
            <li>Items displayed {`${posts.length}`}</li>
            <li onClick={itemsLink}> <button>See all</button></li>
        </ul>
      </div>
   </div>
   <CustomFooter name={username}/>
 </>
 )
}

export default Profile
