import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import * as routes from "./routes"

import { useStore } from '../store';
/**
 *
 * provides outhUser, login and logout functionality
 */
const AuthRoute = ({component:Component, ...rest }) => {
  const {auth } = useStore()

  return(
   <Route
   {...rest}
   render = {props =>
     auth ? <Redirect to={routes.HOME}/> : <Component {...props}/>
   }
   />
  )
}

export default AuthRoute;