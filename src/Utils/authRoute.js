import React from 'react'
import {Route, Redirect} from 'react-router-dom'


import { useStore } from '../store';
/**
 *
 * provides authUser, login and logout functionality
 */
const AuthRoute = ({component:Component, ...rest }) => {
  const { auth } = useStore()

  return(
   <Route
   {...rest}
   render = {props =>
     auth ? <Redirect to={"/"}/> : <Component {...props}/>
   }
   />
  )
}

export default AuthRoute;