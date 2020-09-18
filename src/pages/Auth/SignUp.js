import React, {useState} from 'react'
import {Grid, Button, GridColumn, Form} from "semantic-ui-react"
import {useMutation} from '@apollo/client'
import {Link} from "react-router-dom"

import { SET_AUTH_USER } from '../../store/auth';
import { useStore } from '../../store';
import { SIGN_UP } from '../../graphql/user';



/**
 *
 * lets new user in
 */
function SignUp({history}) {
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
    console.log(result)
    localStorage.setItem('jwt', token);
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
<Grid >
  <GridColumn mobile={14} tablet={10} computer={8}>
    <Grid.Row>
       <div className='form-container'>
    <Form onSubmit={handleSubmit} noValidate className={loading ? "loading": ""}>
      <h2>Sign-up</h2>

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
     <div className="ui error message">
         {renderErrors(errors)}
    </div>
    )}
  </div>
    </Grid.Row>
  </GridColumn>
  <GridColumn mobile={14} tablet={10} computer={8}>
    <Grid.Row>
      <div>
        <Link to="/about"><h2>More about us</h2></Link>
      </div>
    </Grid.Row>
  </GridColumn>
</Grid>

 );
}

export default SignUp;