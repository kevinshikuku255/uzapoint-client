import React from "react";
import {useHistory} from "react-router-dom";
import   "./header.css";
import HomeIcon from '@material-ui/icons/Home';

/**Logged out Header... */
const LoggedOut = () => {
const history = useHistory()
const path = history.location.pathname

const backHome = () =>{
   history.push('/')
}

const signup = () =>{
   history.push('/signup')
}

const Login = () =>{
   history.push('/signin')
}


return(
<>
 <div className="loggedOutHeader">
   <div className="loggedOutTab">
      { path === "/" ?
      <p><span className="logo"> <HomeIcon/> </span></p> :
      <p  onClick={backHome}><span className="logo"><HomeIcon/></span></p>}

   </div>

    <input className="menu_btn" type="checkbox" id="loggedIn_menu_btn"/>
    <label htmlFor="loggedIn_menu_btn" className="menu_icon">
         <span className="nav_icon"> </span>
    </label>

        <ul className="menu">
              {path === "/signin" ?
              <i style={{color:"gray"}}><li>Login</li></i> :
              <i onClick={Login}><li>Login</li></i>
              }
              {path === "/signup" ?
              <i style={{color:"gray"}}><li>SignUp</li></i> :
              <i onClick={signup} ><li>SignUp</li></i>
              }
        </ul>

 </div>
</>
)
}

export default LoggedOut;