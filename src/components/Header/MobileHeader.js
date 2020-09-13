import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import LoggedInMenu from "./LoggedInMenu"
import LoggedOutMenu from "./LoggedOutMenu"
import OtherMenu from "./OtherMenu"

import { useStore } from '../../store';

function MobileHeader() {
const location = useRouteMatch()
const exact = location.isExact;
 const [{auth}] = useStore();

return (
  <div>
    {auth.user  && exact ? <LoggedInMenu/> : <LoggedOutMenu/>}
    {auth.user && !exact && <OtherMenu/>}
  </div>
)

}
export default MobileHeader;