import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import LoggedOutMenu from "./LoggedOutMenu"
import SignedInMenu from "./SignedInMenu"
import OtherMenu from "./OtherMenu"


import { useStore } from '../../store';

function MobileHeader() {
const location = useRouteMatch();


const exact = location.isExact;
 const [{auth}] = useStore();

return (
  <div>
    {auth.user  && exact ? <SignedInMenu/> : <LoggedOutMenu/>}
    {auth.user && !exact && <OtherMenu/>}
  </div>
)

}
export default MobileHeader;