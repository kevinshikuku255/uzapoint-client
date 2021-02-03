import React,{useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { InfoOutlined, ImageOutlined } from "@material-ui/icons";

import {AuthUserContext} from "../../Utils/authUserContext";
import icon from "../../Assets/icon.png";
import cover from "../../Assets/cover.jpg";
import Footer from "../../components/Footer/index";
import ProfileHeader from "../../components/Header/profileHeader";
import Info from "../windoshoppe/info";
import Items from "./items";


import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft:0,
  },
}));


/* ------------------------------------------------------------------------------ */
/** ..AuthProfile component........................... */
function AuthProfile() {
   const classes = useStyles();
   const history = useHistory();
   const [tab, setTab] = useState(0);
   const {data, loading} = useContext(AuthUserContext);


/** Loading section */
if(loading){
   return (<h1>Loading...</h1>)
}


 const {  username,image, email, phone, fullname, businessdescription, posts,coverImage} = data.getAuthUser;

 const toEditProfile = () =>{
   history.push(`/profile/${username}/editprofile`)
   }

/** Main section */
const main =
     <>
            <div className="topBar">
                  <div>
                     <Avatar alt="avator" onClick={() => setTab(0)} src={image || icon} className={classes.small}/>
                  </div>
                  <div onClick={() => setTab(1)}>
                     <ImageOutlined/>
                     <h4 style={{color: tab === 1 ? "blue" : ""}} >Items</h4>
                  </div>


                  <div onClick={() => setTab(2)}>
                     <InfoOutlined/>
                     <h4 style={{color: tab === 2 ? "blue" : ""}}>Help</h4>
                  </div>
            </div>

       { tab === 0 &&
        <div className="profile_Infor">
            <img height="100rem" alt="cover" width="100%" src={coverImage || cover}/>
            <div className="bioData">
               <h2>{fullname}</h2>
               <p>{username}</p> <br/>

               <h3>My business contacts</h3>
               <p>{email}</p>
               <p>{ phone}</p> <br/>

               <h3>My business decription</h3>
               <p>{businessdescription}</p>
            </div>
            <button onClick={toEditProfile} className="edit_profile_btn">Edit Profile</button>
       </div>
       }
       {tab === 1 && <Items posts={posts}/>}
       {tab === 2 && <Info/> }
     </>
 return (
  <>
     <ProfileHeader tag={username}/>
     <main>
       {main}
     </main>
     <Footer/>
  </>
 )
}

export default AuthProfile;
