import React from "react";
import {useHistory} from "react-router-dom";
import   "./header.css";

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';



/**Other Header... */
const OtherHeader = ({tag}) => {
const history = useHistory()

const backHome = () =>{
   history.push('/')

}

return(
<>
 <div className="othertHeader">
   <div className="otherHearderTab">
      <p onClick={backHome}><span className="back_arrow"><ArrowBackIos/></span></p>
      <span className="other_header_tag"> {tag} </span>
   </div>
 </div>
</>
)
}

export default OtherHeader;