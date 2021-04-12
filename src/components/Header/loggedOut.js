import React from "react";
import {useHistory} from "react-router-dom";
import {Home} from '@material-ui/icons';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import Routes from "../../store/routes";
import   "./header.css";
/**Logged out Header... */
const LoggedOut = ({notification_icon}) => {
const history = useHistory()
const path = history.location.pathname;
const {signup, Login, backHome, buyers } = Routes()





return(
<>
 <div className="loggedOutHeader">
   <div className="loggedOutTab">

      { path === "/" ?
      <p><span className="logo"> <Home/> </span></p> :
      <p  onClick={backHome}><span className="logo"><Home/></span></p>}

      { path === "/buyers" ?
      <p><span className="logo"> <AddShoppingCartSharpIcon/> </span></p> :
      <p  onClick={buyers}><span className="logo"><AddShoppingCartSharpIcon/></span></p>}

      {<p><span className="logo">{notification_icon}</span></p>}

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