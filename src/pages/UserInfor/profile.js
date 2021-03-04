import React from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery}  from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import {Email, PhoneAndroid, LocationOn, WhatsApp} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import RouteHeader from "../../components/Header/routeHeader";
import  './profile.css'

import {GET_USER } from '../../graphql/user';
import CustomFooter from "../../components/Footer/customFooter"
import { weekDay } from '../../Utils/date';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import {SkeletonBar2, SkeletonPost} from "../../components/Skeleton/skeleton";

const  useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor:"#2ceaff"
  }

}));



/** Profile page */
const  Profile = ()  => {
 const path = useRouteMatch();
 const classes = useStyles();
 const name = path.params.username.split(':').pop();
 const history = useHistory();
 UsedocumentTitle("Profile")
//  const path = history.location.pathname


 const { data,loading} = useQuery(GET_USER,{
   variables:{
     username:name
   }
 });

/** Loading section */
      let loader;
      if(loading){
         return (
           <>
            <RouteHeader tag={"username"}/>
            <SkeletonPost/>
            <SkeletonBar2/>
           </>
         )
      }


const {username, fullname,location, posts, businessdescription, phonenumber, email, image, createdAt} = data.getUser;

const avator = image ?  image : null;
const weekday = weekDay(createdAt);
const internationalPhone = phonenumber && `+254${phonenumber.substring(1)}`;


/* ------------------ Route links functions-------------------------------------------------------- */
 const itemsLink = () =>{
    history.push(`/profile/:${username}/items`)
 }

/* -------------------------------------------------------------------------- */


const main =
 <>

   <div className="profile_container">
     <div className="avator">
          <Avatar alt="logo" src={avator} className={classes.large}/>
          <div>
              <p>{fullname ? fullname : username}</p>
              <p> Phone: {phonenumber}</p>
              {email && <p> Email: {email}</p>}
          </div>
     </div>

     <div className="profileContact" >
        <p style={{fontWeight:"bolder"}}>Contact information:</p>
        <ul>
           <a href={`tel:${phonenumber}`} ><li> <PhoneAndroid/> <p>Direct call</p></li></a>
           <a href={`https://api.whatsapp.com/send?phone=${internationalPhone}`}> <li> <WhatsApp/> <p>WhatsApp</p></li> </a>
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


      {location &&
      <div className="location">
        <p className="bold">Direction:</p>
        <p><LocationOn/></p> <p>{location}</p>
      </div>}

      <div className="items" >
        <ul>
            <li>Items displayed {`${posts.length}`}</li>
            <li onClick={itemsLink}> <button>See all</button></li>
        </ul>
      </div>
   </div>

 </>




 return (
  <>
     <RouteHeader tag={username}/>
     <main>
       {loading ? loader : main}
     </main>
     <CustomFooter name={username}/>
  </>

)
}

export default Profile
