import React, {useState} from 'react'
import { Button, Form,  } from "semantic-ui-react"
import {useMutation} from '@apollo/client'
import {Link} from "react-router-dom"

import { SET_AUTH_USER } from '../../store/auth';
import { useStore } from '../../store';
import { SIGN_UP } from '../../graphql/user';
import logo from "./logo.png"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import NearMeIcon from '@material-ui/icons/NearMe';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(7,0,0,0),
  }
}));




/**
 *
 * lets new user in
 */
function SignUp({history}) {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  console.log(errors)
  const [, dispatch] = useStore();
  const [values, setValues] = useState( {fullName: '', username: '', phone: '',  password: ''});

/**
 * change hundler...
 */
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




/**
 * useMutation hook
 */
 let [signUpUser,{ loading}] = useMutation(SIGN_UP,{
  update(_, result){
    const token = result.data.signup.token;
    localStorage.setItem('jwt',token);
    dispatchAction(token)
    history.push("/");
 },
 variables : values,
  onError(err){
      setErrors(err.message)
  },
   });



  const handleSubmit = (e) => {
       e.preventDefault();
       signUpUser();
       setErrors("")
  };



/**
 * api errors
 */
const renderErrors = apiError => {
    let errorMessage;
    if (errors) {
      errorMessage = errors;
    }
    else if (apiError) {
      errorMessage = apiError.message;
    }
    if (errorMessage) {
      return (
         <div>{errorMessage}</div>
      );
    }
    return null;
  };


 return (
<>
<Card className={classes.card}>
         <CardHeader
         avatar={
              <Avatar  alt="logo" src={logo} />
             }
        title={
            <Typography variant="h4">
                Sign-up
            </Typography>
            }
         action={
            <IconButton aria-label="settings">
              <Link to="/about">About us <NearMeIcon/> </Link>
            </IconButton>
        }
      />
      <CardContent>
          <Form onSubmit={handleSubmit} noValidate className={loading ? "loading": ""}>
            <Form.Input
            label="Username"
            placeholder="Username"
            name= "username"
            type="text"
            error={ !values.username && errors ? true : false}
            value ={values.username}
            onChange={handleChange}
            />

            <Form.Input
            label="Phone"
            placeholder="Phone"
            name= "phone"
            type="phone"
            error={ !values.phone && errors ? true : false}
            value={values.phone}
            onChange={handleChange}
            />

            <Form.Input
            label="Password"
            placeholder="Password"
            name= "password"
            type="password"
            error={!values.password && errors ? true : false}
            value={values.password}
            onChange={handleChange}
            />

          <Button type="submit" primary>
              Sign-up
          </Button>
          </Form>
          { errors && (
          <Alert severity="error">{renderErrors(errors)}</Alert>
          )}
      </CardContent>
</Card>
</>
 );
}

export default SignUp;