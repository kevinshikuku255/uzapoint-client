import React, {useState} from 'react'
import {Grid, Button, GridColumn, Form, Header } from "semantic-ui-react"
import {useMutation} from '@apollo/client'
import {Link} from "react-router-dom"

import { SET_AUTH_USER } from '../../store/auth';
import { useStore } from '../../store';
import { SIGN_UP } from '../../graphql/user';



function SignIn({history}) {
  const [errors, setErrors] = useState('');
  const [, dispatch] = useStore();
  const [values, setValues] = useState({
    fullName: '',
    username: '',
    phone: '',
    password: '',
  });

/**
 * change hundler...
 */
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


const validate = () => {
    if (!phone || !username || !password) {
      return 'All fields are required';
    }
    if (!phone && !username && !password) {
      return 'All fields are required';
    }
    if (phone.length < 10) {
      return 'provide a correct phone number';
    }
    if (phone.length > 13) {
      return 'provide a correct phone number';
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (!usernameRegex.test(username)) {
      return 'Usernames can only use letters, numbers, underscores and periods';
    } else if (username.length > 20) {
      return 'Username no more than 50 characters';
    }

    if (password.length < 6) {
      return 'Password should be min of  6 characters';
    }

    return false;
  };
 const { phone, password, username } = values;


const dispatchAction = (token) =>{
  dispatch({
    type:SET_AUTH_USER,
     payload:token
  })
}

/**
 * submit hundler
 */
const handleSubmit = (e, signup) => {
    e.preventDefault();
    error = validate();
    if (error) {
      return setErrors(error);
    }

    signup().then(async (SigUpnResult) => {
     if(SigUpnResult){
      const {data} = SigUpnResult;
      localStorage.setItem('jwt', data.signup.token);
      dispatchAction(data.signup.token)
      history.push("/");
     }
    });
  };


/**
 * Render errors
 */
  const renderErrors = apiError => {
    let errorMessage;


    if(Array.isArray(errors)){
      errorMessage =  errors[0].message;
    }else if(errors){
      errorMessage = errors;
    }

    if (errorMessage) {
      return (
        <div>{errorMessage}</div>
      );
    }
    return null;
  };




 let [signup, { loading, error}] = useMutation(SIGN_UP, {
  update(){
  history.push("/Me");
 },
  onError(err){
  setErrors(err.graphQLErrors)
  },
  variables : values
});


 return (

<Grid className='form-container'>


  <GridColumn mobile={14} tablet={10} computer={8}>
    <Grid.Row>
       <div >
    <Form onSubmit={e => handleSubmit(e, signup)} noValidate className={loading ? "loading...": ""} >
      <h1>Sign-up</h1>

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
         {renderErrors(error)}
    </div>
    )}
  </div>
    </Grid.Row>
  </GridColumn>
  <GridColumn mobile={14} tablet={10} computer={8}>
    <Grid.Row>
      <div>
        <Link to="/about"><Header >About us</Header></Link>
      </div>
    </Grid.Row>
  </GridColumn>
</Grid>


 );
}

export default SignIn;