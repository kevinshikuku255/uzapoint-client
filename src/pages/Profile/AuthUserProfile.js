import React,{useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { InfoOutlined, ImageOutlined } from "@material-ui/icons";

import {AuthUserContext} from "../../Utils/authUserContext";
import cover from "../../Assets/bg.jpg";
import Footer from "../../components/Footer/index";
import ProfileHeader from "../../components/Header/profileHeader";
import Info from "../windoshoppe/info";
import Items from "./items";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import { LoadingIndicator } from "../../components/Skeleton/skeleton";


import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
}));


/* ------------------------------------------------------------------------------ */
/** ..AuthProfile component........................... */
function AuthProfileComponent() {
   const classes = useStyles();
   const history = useHistory();
   const [tab, setTab] = useState(0);
   const {data, loading} = useContext(AuthUserContext);
   UsedocumentTitle("Profile")

/** Loading section */
      let loader;
      if(loading){
         return ( <LoadingIndicator/>)

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
                     <Avatar alt="avator" onClick={() => setTab(0)} src={image || "W"} className={classes.small}/>
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
       {loading ? loader : main}
     </main>
     <Footer/>
  </>
 )
}

export default AuthProfileComponent;
