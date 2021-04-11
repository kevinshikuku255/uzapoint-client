import React, {useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery}  from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import {Email, PhoneAndroid, LocationOn, WhatsApp, CloseRounded} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import RouteHeader from "../../components/Header/routeHeader";
import  './profile.css'

import {GET_USER } from '../../graphql/user';
import { weekDay } from '../../Utils/date';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {SkeletonBar2, SkeletonPost} from "../../components/Skeleton/skeleton";
import Overlay from "../../components/Acordion/Overlay";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
 UsedocumentTitle("Profile");
 const [open, setOpen] = useState(false)


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

const {username, fullname,location, posts,buys, businessdescription, phonenumber, email, image,coverImage, createdAt} = data.getUser;

const weekday = weekDay(createdAt);
const internationalPhone = phonenumber && `+254${phonenumber.substring(1)}`;


/* ------------------ Route links functions-------------------------------------------------------- */
 const itemsLink = () =>{
    history.push(`/profile/${username}/items`)
 }

 const buysLink = () =>{
    history.push(`/profile/${username}/buys`)
 }
/* -------------------------------------------------------------------------- */


const main =
 <>
      {coverImage &&
      <div className="userinfor_cover_photo" >
        {<>
          <LazyLoadImage
            alt={username}
            effect="blur"
            height="100%"
            width="100%"
            loading="lazy"
            src={coverImage}/>
        </>}
      </div>}
   <div className="profile_container">
     <div className="avator">
          {<Avatar alt="logo" src={image} className={classes.large}/>}
          <div>
              <p>{fullname ? fullname : username}</p>
              {phonenumber && <p>  {`phone:${phonenumber}` }</p>}
              {email && <p> Email: {email}</p>}
          </div>
     </div>

     <div className="profileContact" >
        <p style={{fontWeight:"bolder"}}>Contact information:</p>
        <p>{internationalPhone}</p>
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

     <div className="profile_description">
       <b> Joined:</b>
       <p>{weekday}</p>
     </div>


      {location &&
      <div className="location">
         <b className="bold">Direction:</b>
         <p> <LocationOn/> {location} </p>
      </div>}

      <div className="items" >
        { posts.length > 0 &&
        <div>
            <p>Selling {`${posts.length}`} items</p>
            <p onClick={itemsLink}>
               { <button >See all</button> }
            </p>
        </div>}
        <div>
            {buys.length > 0 && <div>
               <p>Buying  {`${buys.length}`} items</p>
               <p onClick={buysLink}> <button>See all</button></p>
            </div>}
        </div>
      </div>
   </div>

 </>


const btn = <p onClick={() => setOpen(false)} > <CloseRounded fontSize="large"/> </p>

 return (
  <>
     <RouteHeader tag={username}/>
     <main>
       <Overlay state={open} btn={btn} image={image} alt={username} />
       {loading ? loader : main}
     </main>
  </>

 )
}

export default Profile
