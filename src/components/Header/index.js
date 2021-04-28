import React from 'react'
import {useHistory} from "react-router-dom";
import {Home,  AddShoppingCartSharp, PersonOutlined} from '@material-ui/icons';
import Routes from "../../store/routes";
import { useStore } from '../../store';
import {SideBar, LogeddeOutSideBar} from "./SideBar";
// import {PostNotificationContext} from "../../Utils/PostNotificationContext";
import {} from '@material-ui/icons';
import   "./header.css";


/** Dynamic Header components */
function Header() {
 const [{auth}] = useStore()
 const history = useHistory();
 const path = history.location.pathname
 const {buyers, backHome, toProfile} = Routes();



// const {data, loading} = useContext(PostNotificationContext);

// const toNotification = () => {
//    history.push("/notification")
// }


// const infoIcon = !loading && data ?
//                      <NotificationsActive style={{color:"blueviolet"}}/> : <NotificationsTwoTone style={{color:"gray"}}/>


const header_logic = (
<>
 <div className="loggedInHeader">
    <div className="loggedInTabs">
      { path === "/" ?
      <p><span className="logo"> <Home style={{color:"blue"}} /> </span></p> :
      <p  onClick={backHome}><span className="logo"><Home/></span></p>}

      { path === "/buyers" ?
      <p><span className="logo"> <AddShoppingCartSharp  style={{color:"blue"}} /> </span></p> :
      <p  onClick={buyers}><span className="logo"><AddShoppingCartSharp/></span></p>}

      {auth.user && <p onClick={toProfile} > <span className="logo"><PersonOutlined/></span> </p>}

    </div>
    {auth.user ? <SideBar/> : <LogeddeOutSideBar/>}
 </div>
</>
);

  return header_logic
}

export default Header;
