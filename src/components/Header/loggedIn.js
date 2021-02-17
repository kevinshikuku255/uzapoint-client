import React from "react";
import {useHistory} from "react-router-dom";
import {useStore} from "../../store";
import   "./header.css";
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Home from '@material-ui/icons/Home';
import Routes from "../../store/routes";



/** Logged in Header */
const LoggedIn = () => {
 const history = useHistory()
 const path = history.location.pathname
 const [{auth}] = useStore();
 const {sell, backHome, search, toPrile, AboutUs, toAppInfo,settings,toProfile,toPeople} = Routes()



return(
<>
 <div className="loggedInHeader" style={{ transform : path === "/" ? "translate(0vw)" : "translate(100vw)"} } >
    <div className="loggedInTabs">
         { (path === "/" && auth.user) ?
         <p onClick={toPrile} ><span  className="logo"> <AccountCircleOutlined/> </span></p> :
         <p onClick={backHome}><span className="logo"> <Home/> </span></p>}

         <p onClick={sell} ><span className="logo">sell</span></p>
         <p onClick={search} ><span className="logo">search</span></p>
    </div>

    <input className="menu_btn" type="checkbox" id="loggedIn_menu_btn"/>
    <label htmlFor="loggedIn_menu_btn" className="menu_icon">
         <span className="nav_icon"> </span>
    </label>

        <ul className="menu">
              <li onClick={sell}> Sell</li>
              <li onClick={toProfile}> My profile</li>
              <li onClick={settings}> Edit Profile </li>
              <li onClick={toPeople}> People </li>
              <li onClick={AboutUs}> About Us </li>
              <li onClick={toAppInfo}> App info </li>
        </ul>

 </div>
</>
)
}

export default LoggedIn