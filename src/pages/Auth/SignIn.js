import React, {useState} from 'react'
import { Button, Form } from "semantic-ui-react"
import {useMutation} from '@apollo/client'
import {Link} from "react-router-dom"


import { SIGN_IN } from '../../graphql/user';
import { useStore } from '../../store';
import { SET_AUTH_USER } from '../../store/auth';


import logo from "./logo.png"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin:"auto",
  },
  container:{
 margin: theme.spacing(7,0,0,0),
  },
  footer:{
  position: "fixed",
  width: "100vw",
  bottom: 0,
  textAlign: "center",
  backgroundColor:"white"
  }
}));




/**
 *
 * lets existing user in
 */
function SignIn({history}) {
  const classes = useStyles();
  const [values, setValues] = useState({ phoneOrUsername: '', password: '' });
  const [errors, setErrors] = useState('');
  const [, dispatch] = useStore();


  /**
 * submit hundler
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
 let [signInUser,{ loading}] = useMutation(SIGN_IN, {
  update(_, {data}){
    const token = data.signin.token
    localStorage.setItem('jwt',token);
    dispatchAction(token)
    history.push("/");
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



/**
 * api errors
 */
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
         <div>{errorMessage}</div>
      );
    }
    return null;
  };

 return (
<div className={classes.container}>

<Card className={classes.card}>
         <CardHeader
         avatar={
              <Avatar  alt="logo" src={logo} />
             }
        title={
            <Typography variant="h4">
                Login
            </Typography>
            }
      />
      <CardContent>
        <Form onSubmit={handleSubmit} noValidate className={loading ? "loading": ""} >
          <Form.Input
          label="Phone / Username"
          placeholder="PhoneOrUsername"
          name= "phoneOrUsername"
          type="text"
          error={ !values.phoneOrUsername && errors ? true : false}
          value ={values.phoneOrUsername}
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
            Login
        </Button>
        </Form>
        { errors.length > 0  && (
              <Alert severity="error">{renderErrors(errors)}</Alert>
            )}
        <IconButton aria-label="settings">
            <Link to="/register"> <h5>Create account instead !!</h5> </Link>
        </IconButton>
      </CardContent>
</Card>

  <div  className={classes.footer}>
  <b><p>Copyright  2020 all rights reserved <br/> Kevin Shikuku production</p></b>
  </div>

</div>
 );
}
export default SignIn;



