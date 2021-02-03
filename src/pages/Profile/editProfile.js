import React,{useState,useContext} from 'react';
import {useMutation} from "@apollo/client";
import {TextareaAutosize, Avatar} from '@material-ui/core';
import jwtDecode  from 'jwt-decode';
import {useHistory} from "react-router-dom";
import {LocationOn, BusinessCenter, EmailOutlined, AccountCircleRounded, EditOutlined} from '@material-ui/icons';


import RouteHeader from "../../components/Header/routeHeader";
import icon from "../../Assets/icon.png";
import {EDIT_USER_PROFILE, GET_AUTH_USER }from "../../graphql/user";
import { SET_AUTH_USER } from '../../store/auth';
import  {AuthUserContext} from "../../Utils/authUserContext";

import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store';
const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));



/** Edit profile component */
function EditProfile() {
   const classes = useStyles();
   const history = useHistory();
   const [{auth}] = useStore();
   const [ , dispatch] = useStore();
   const [errors, setErrors] = useState("");
   const userId = auth.user.id;
   const value = useContext(AuthUserContext);
   const [values, setValues] = useState({ fullname:"", location:"", email:"", businessdescription:"", id:userId});


/** change hundler... */
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };



const dispatchAction = (token) =>{
  dispatch({
    type:SET_AUTH_USER,
     payload:token
  })
}


/** Use mutation */
  let [submitUser,{loading   }] = useMutation(EDIT_USER_PROFILE,{
      update(_, result){
        const token = result.data.editUserProfile.token;
        const decodedToken = jwtDecode(token);
        localStorage.removeItem("jwt");
        localStorage.setItem('jwt',token);
        dispatchAction(decodedToken)
        history.goBack()
    },
     variables:values,
     refetchQueries:[
       {query:GET_AUTH_USER}
     ],
        onError(err){
          setErrors(err.graphQLErrors)
        },
      });






  const handleSubmit = async (e) => {
     e.preventDefault();
     submitUser();
     setErrors("");
  };


/**api errors */
const renderErrors = apiError => {
    let errorMessage;
    if (errors) {
      errorMessage = errors[0].message;
    }
    else if (apiError) {
      errorMessage = apiError.message;
    }
    if (errorMessage) {
      return (
         <i>{`${errorMessage} !!`}</i>
      );
    }
    return null;
  };


      /** Loading section */
      let loader
      if(value.loading){
        loader = icon
        return loader
      }

   const {  username, image } = value.data.getAuthUser;
   const  avator = image ? image : icon;

 return (
  <div>
    <RouteHeader tag={"Edit Profile"}/>
    <main>
      <div className="edit_profile_avator">
        <Avatar alt="avator" src={loader || avator} className={classes.small}/>
        <h2>{username}</h2>
      </div>
      {loading ? <p>Loading ......</p> :

      <form onSubmit={handleSubmit}>

        { errors.length > 0  && (
              <p className="error" >{renderErrors(errors)}</p>
            )}

            <div className="edit_input">
                <div className="edit_icon"> <AccountCircleRounded/> </div>
                <div className="edit_details">
                  <h3>Fullname</h3>
                  <input
                     type="text"
                     placeholder="Add your fullname"
                     name="fullname"
                     onChange={handleChange}
                     value={values.fullname}/>
                   <EditOutlined/>
                </div>
            </div>

            <div className="edit_input">
                <div className="edit_icon"> <EmailOutlined/> </div>
                <div className="edit_details">
                  <h3>Email adress</h3>
                  <input
                     type="email"
                     placeholder="Add youremail adress"
                     name="email"
                     onChange={handleChange}
                     value={values.email}/>
                  <EditOutlined/>
                </div>
            </div>

            <div className="edit_input">
                <div className="edit_icon"> <BusinessCenter/> </div>
                <div className="edit_details">
                  <h3>Business description</h3>
                  <TextareaAutosize
                        className="edit_profile_textarea"
                        type="text"
                        name="businessdescription"
                        onChange={handleChange}
                        placeholder="Add your Business description"
                        value={values.businessdescription}
                        rowsMin={3}/>
                </div>
            </div>


            <div className="edit_input">
                <div className="edit_icon"> <LocationOn/> </div>
                <div className="edit_details">
                  <h3>Location</h3>
                  <input
                     type="text"
                     placeholder="Add your location"
                     onChange={handleChange}
                     name="location"
                     value={values.location}/>
                   <EditOutlined/>
                </div>
            </div>
            <button type="submit" className="submit_btn">Submit</button>
      </form>
      }

    </main>
  </div>
 )
}

export default EditProfile;
