import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import jwtDecode  from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom"
import CircularProgress from  "@material-ui/core/CircularProgress";



import { SET_AUTH_USER } from '../../store/auth';
import { useStore } from '../../store';
import { SIGN_UP } from '../../graphql/user';
import Logo from "../../Assets/logo.png";
import Header from "../../components/Header/loggedOut";
import Footer from "../../components/Footer";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import './Auth.css'

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));




/** Lets new user  in*/
function SignUp() {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [ , dispatch] = useStore();
  const [values, setValues] = useState( {username: '', phone: '',  password: '', confirmPassword: ''});
  UsedocumentTitle("SignUp");
    const {backHome, toAppInfo} = Routes()

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




/** useMutation hook */
 let [signUpUser,{ loading}] = useMutation(SIGN_UP,{

  update(_, result){
    const token = result.data.signup.token;
    const decodedToken = jwtDecode(token);
    localStorage.setItem('jwt',token);
    dispatchAction(decodedToken)
    backHome();
 },
 variables : values,
   onError(err){
     setErrors(err.graphQLErrors)
  },
   });


/**Handle form submit */
  const handleSubmit = (e) => {
       e.preventDefault();
       signUpUser();
       setErrors("")
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
         <i>{errorMessage}</i>
      );
    }
    return null;
  };



let loader;
if(loading){
  return(
    <div>
      <Header/>
      <div className='loader'>
        <CircularProgress/>
        <p>prepairing...</p>
      </div>
    </div>
  )
}


const main = (

<div className="signInContainer">
      <div>
        <div className="signInLogo">
          <span onClick={toAppInfo} > <Avatar alt="logo" src={Logo} className={classes.large}/> </span>
          <p>windoshoppe</p>
        </div>

        <form onSubmit={handleSubmit}  className="signInForm" >
        { errors.length > 0  && (
              <p className="error" >{renderErrors(errors)}</p>
            )}
             <>
                <input
                placeholder="Create username"
                name= "username"
                type="text"
                value ={values.username}
                onChange={handleChange}
                className="signInInput"
                />
                <input
                placeholder="phone number"
                name= "phone"
                type="text"
                value={values.phone}
                onChange={handleChange}
                className="signInInput"
                />
                <input
                placeholder="Create password"
               name= "password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="signInInput"
                />
                <input
                placeholder="confirm your password"
                name= "confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                className="signInInput"
                />
               <button type="submit" className="signInButton">  Login </button>
             </>

        </form>
        <p><Link to="/aboutus" className="Link" > About us </Link></p>

      </div>
</div>

)

 return (
<>
<Header/>
 {loading ? loader : main}
<Footer/>
</>
 );
}

export default SignUp;