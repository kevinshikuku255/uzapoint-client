import React from "react";
import {useHistory} from "react-router-dom";
import   "./header.css";
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import {InfoOutlined, People, SearchTwoTone, Settings, Person, Home, ShoppingBasketOutlined} from '@material-ui/icons';
import Routes from "../../store/routes";



/** Logged in Header */
const LoggedIn = () => {
 const history = useHistory()
 const path = history.location.pathname
 const {sell, search,buyers, AboutUs, toAppInfo,settings,toProfile, buy, backHome, toPeople} = Routes()



return(
<>
 <div className="loggedInHeader">
    <div className="loggedInTabs">
         { path === "/" ?
             <p> <span className="Applogo" style={{color:"gray"}} ><Home fontSize="default" /></span> </p> :
              <p> <span className="Applogo" onClick={backHome} > <Home fontSize="default" /></span></p>}

         { path === "/buyers" ?
           <p><span className="Applogo" style={{color:"gray"}}> <AddShoppingCartSharpIcon fontSize="default"/> </span></p> : <p> <span className="Applogo"  onClick={buyers}><AddShoppingCartSharpIcon fontSize="default"/></span></p>}

    </div>

    <input className="menu_btn" type="checkbox" id="loggedIn_menu_btn"/>
    <label htmlFor="loggedIn_menu_btn" className="menu_icon">
         <span className="nav_icon"> </span>
    </label>

        <ul className="menu">

              <li onClick={sell}> SELL</li>
              <li onClick={buy}> BUY </li>
              <li onClick={buyers}> <ShoppingBasketOutlined/> <p>Buyers</p> </li>
              <li onClick={toPeople}> <People/> <p>People</p> </li>
              <li onClick={search} > <SearchTwoTone/> <p>Search</p></li>

              <li onClick={toProfile}><div><Person/> <p>My profile</p> </div> </li>
              <li onClick={settings}> <Settings/> <p>Edit Profile</p> </li>

              <li onClick={AboutUs}> <InfoOutlined/> <p>About Us</p> </li>
              <li onClick={toAppInfo}> <p>App info </p></li>
              <div className="emptyDiv"> &copy; windoshoppe 2021 </div>
        </ul>

 </div>
</>
)
}

export default LoggedIn