import React, {useState} from 'react'
import {Grid,  Button, GridColumn, Form } from "semantic-ui-react"
import {useMutation} from '@apollo/client'
import {Link} from "react-router-dom"


import { SIGN_IN } from '../../graphql/user';
import { useStore } from '../../store';
import { SET_AUTH_USER } from '../../store/auth';





/**
 *
 * lets existing user in
 */
function SignIn({ history}) {
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
  update(_, result){
    localStorage.setItem('jwt', result.data.signin.token);
    dispatchAction(result.data.signin.token)
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
   <Grid>
     <GridColumn mobile={14} tablet={10} computer={7}>
       <Grid.Row>
  <div className='form-container'>
    <Form onSubmit={handleSubmit} noValidate className={loading ? "loading": ""} >
      <h2>Login</h2>
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

  <p>Dont have and Account yet? <Link to="/register">Register</Link></p>

 { errors.length > 0  && (
     <div className="ui error message">
         {renderErrors(errors)}
    </div>
    )}
  </div>
       </Grid.Row>

  <div className="Footer">
  <b><p>Copyright  2020 all rights reserved <br/> Kevin Shikuku production</p></b>
  </div>
     </GridColumn>
   </Grid>

 );
}
export default SignIn;



