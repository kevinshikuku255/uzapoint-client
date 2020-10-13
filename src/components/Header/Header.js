import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import LoggedOutMenu from "./LoggedOutMenu"
import LoggedInMenu from "./LoggedInMenu"
import OtherMenu from "./OtherMenu"


import { useStore } from '../../store';

function Header() {
const location = useRouteMatch();


const exact = location.isExact;
 const [{auth}] = useStore();

return (
  <div>
    {auth.user  && exact ? <LoggedInMenu/> : <LoggedOutMenu/>}
    {auth.user && !exact && <OtherMenu/>}
  </div>
)

}
export default Header;