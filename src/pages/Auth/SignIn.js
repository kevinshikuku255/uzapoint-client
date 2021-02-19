import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Link} from "react-router-dom";
import jwtDecode  from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from  "@material-ui/core/CircularProgress"


import { SIGN_IN } from '../../graphql/user';
import { useStore } from '../../store';
import { SET_AUTH_USER } from '../../store/auth';
import Header from "../../components/Header/loggedOut";
import Footer from "../../components/Footer";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";



import Logo from "../../Assets/logo144.png";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));







/** Logs in existing user */
function SignIn() {
  const [values, setValues] = useState({ phoneOrUsername: '', password: '' });
  const [errors, setErrors] = useState('');
  const [, dispatch] = useStore();
  const classes = useStyles();
  UsedocumentTitle("SignIn");
  const {backHome, toAppInfo} = Routes();


/**submit hundler */
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



/**useMutation hook */
 let [signInUser,{loading}] = useMutation(SIGN_IN, {
  update(_, {data}){
    const token = data.signin.token
    localStorage.setItem('jwt',token);
    const decodedToken = jwtDecode(token);
    dispatchAction(decodedToken)
    backHome()
 },
 variables : values,
  onError(err){
     setErrors(err.graphQLErrors)
  },
   });


  const handleSubmit = (e) => {
      e.preventDefault();
      signInUser();
      setErrors('');
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
        <p>Preparing to signin ...</p>
        <Footer/>
      </div>
    </div>
  )
}

const main = (

<div className="signInContainer">
      <div>
        <div  onClick={toAppInfo}  className="signInLogo">
          <span> <Avatar alt="logo" src={Logo} className={classes.large}/> </span>
          <p>windoshoppe</p>
        </div>
        <form onSubmit={handleSubmit}  className="signInForm" >

           {errors.length > 0  && (
              <p className="error">{renderErrors(errors)}</p>
            )}

            {
            <>
            <input
            placeholder="PhoneOrUsername"
            name= "phoneOrUsername"
            type="text"
            autoFocus
            value ={values.phoneOrUsername}
            onChange={handleChange}
            className="signInInput"
            />
            <input
            placeholder="Password"
            name= "password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="signInInput"
            />
            <button type="submit" className="signInButton">  Login </button>
            </>
            }


        </form>
        <p style={{textAlign:"center"}}>Dont have an accout yet? <Link to="/signup" className="Link" > Create</Link></p> <br/>
            <Link to="/aboutus" className="Link" > <button>About us</button> </Link>
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
export default SignIn;

