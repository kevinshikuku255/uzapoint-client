import React from "react";
import {useHistory} from "react-router-dom";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';



/**RouteHeader  */
const RouteHeader = ({tag}) => {
const history = useHistory();




const backHome = () =>{
   history.goBack()
}

return(
<>
 <div className="othertHeader">
   <div className="loggedOutTab">
      <p onClick={backHome}><span className="logo"><ArrowBackIos/></span></p>
      <p><span className="logo"> {tag} </span></p>
   </div>

 </div>
</>
)
}

export default RouteHeader;