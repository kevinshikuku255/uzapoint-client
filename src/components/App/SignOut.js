import React from 'react';
import { Dropdown } from 'semantic-ui-react'



import { useStore } from '../../store';
import { CLEAR_AUTH_USER } from '../../store/auth';

/**
 * Component that signs out the user
 */
const SignOut = () => {
  const [, dispatch] = useStore();
  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
    localStorage.removeItem('jwt');
  };


  return (
   <Dropdown.Item icon='sign-out' text='Logout' onClick={handleSignOut}/>
  );
};


export default SignOut;
