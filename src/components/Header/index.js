import React from 'react'
import { useStore } from '../../store';
import LoggedIn from "./loggedIn";
import LoggedOut from "./loggedOut"

/** Dynamic Header components */
function Header() {
 const [{auth}] = useStore()

  return (
   <div>
     {auth.user ? <LoggedIn/> : <LoggedOut/>}
   </div>
  )
}

export default Header;
