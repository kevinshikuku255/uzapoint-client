import React from 'react'
import { useStore } from '../../store';
import LoggedIn from "./loggedIn";
import LoggedOut from "./loggedOut"

/** Dynamic Header components */
function Header({notification_icon}) {
 const [{auth}] = useStore()

  return (
   <div>
     {auth.user ? <LoggedIn notification_icon={notification_icon}/> : <LoggedOut notification_icon={notification_icon}/>}
   </div>
  )
}

export default Header;
