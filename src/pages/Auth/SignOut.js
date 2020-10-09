import React from 'react';


import { useStore} from '../../store';
import { CLEAR_AUTH_USER } from '../../store/auth';

/**
 * Component that signsOut the user
 */
const SignOut = () => {
  const [, dispatch] = useStore();
  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
    localStorage.removeItem("jwt");
  };


  return (
    <>

<button onClick={handleSignOut}>
   <p style={{color:"skyblue"}}>Log out</p>
</button>
   </>
  );
};


export default SignOut;


