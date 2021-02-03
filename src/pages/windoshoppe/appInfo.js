import React from 'react';
import {useHistory} from "react-router-dom";
import icon from "../../Assets/icon.png"
import {ArrowBackIos} from '@material-ui/icons';
import './about.css';

/** more infor about windoshoppe */
function AppInfo() {

const history = useHistory();

const back = () => {
    history.goBack()
}
 return (
<>

    <div className="app_info_bar" >
        <p style={{cursor:"pointer"}} onClick={back}> <ArrowBackIos/> </p>
    </div>
    <div className="app_Info_component">
     <h1>Windoshoppe</h1>
     <p>version 0.1.0</p>
     <p>By kevin shikuku </p>
     <img src={icon} alt="icon" width="50rem" height="50rem"/>
     <i> &copy;2020-2021 windoshoppe </i>
  </div>
</>
 )
}

export default AppInfo;
