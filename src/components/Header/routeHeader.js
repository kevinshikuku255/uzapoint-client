import React from "react";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Routes from "../../store/routes";



/**RouteHeader  */
const RouteHeader = ({tag}) => {
const {goBack}= Routes()


return(
<>
 <div className="othertHeader">
      <div className="loggedOutTab">
         <p onClick={goBack}><span className="logo"><ArrowBackIos/></span></p>
         <p><span className="logo"> {tag} </span></p>
      </div>
 </div>
</>
)
}

export default RouteHeader;