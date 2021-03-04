import React,{useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import { GET_USER} from "../../graphql/user";

import Avatar from '@material-ui/core/Avatar';
import { InfoOutlined, ImageOutlined } from "@material-ui/icons";

import Footer from "../../components/Footer/index";
import ProfileHeader from "../../components/Header/profileHeader";
import Info from "../windoshoppe/info";
import Items from "./items";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import {  Skeleton } from "../../components/Skeleton/skeleton";


import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
  edit_profile_btn:{
  color:"blue",
  cursor:"pinter",
  textAlign:"center",
  margin:theme.spacing(2,0),
  fontSize:"2rem"
  }
}));


/* ------------------------------------------------------------------------------ */
/** ..AuthProfile component........................... */
function AuthProfileComponent() {
    const path = useRouteMatch();
   const classes = useStyles();
   const history = useHistory();
   const name = path.params.username.split(':').pop();
   const [tab, setTab] = useState(0);
   UsedocumentTitle("Profile")


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
            <ProfileHeader tag={"username"}/>
            <Skeleton/>
           </>
         )
      }
 const {  username,image, email, phonenumber, fullname, businessdescription, posts} = data.getUser;

 const toEditProfile = () =>{
   history.push(`/profile/${username}/editprofile`)
   }

/** Main section */
const main =
     <>
            <div className="topBar">
                  <div>
                     <Avatar alt="avator" onClick={() => setTab(0)} src={image || ""} className={classes.small}/>
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
            {/* { coverImage ?  <img height="100rem" alt="cover" width="100%" src={coverImage}/> : <SkeletonPost/> } */}
            <div className="bioData">
               <h2>{fullname}</h2>
               <p>{username}</p> <br/>

               { email && phonenumber &&
               <>
               <h3>My business contacts</h3>
               <p>{email}</p>
               <p>{ phonenumber}</p> <br/>
               </>
               }

               { businessdescription &&
               <>
                <h3>My business decription</h3>
               <p>{businessdescription}</p>
               </>
               }
            </div>
            <div className={classes.edit_profile_btn}>
               <p onClick={toEditProfile} className={classes.p}>Edit Profile</p>
            </div>
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
