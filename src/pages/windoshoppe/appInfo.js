import React from 'react';
import icon from "../../Assets/icon.png"
import {ArrowBackIos} from '@material-ui/icons';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import './about.css';

/** more infor about windoshoppe */
function AppInfo() {
    const {goBack} = Routes()
    UsedocumentTitle("AppInfo")


    return (
    <>
    <div style={{color:"mintcream"}} >
        <div className="app_info_bar" >
            <p style={{cursor:"pointer"}} onClick={goBack}> <ArrowBackIos/> </p>
        </div>
        <div className="app_Info_component">
            <h1>Windoshoppe</h1>
            <p>version 0.1.0</p>
            <p>By kevin shikuku </p>
            <img src={icon} alt="icon" width="50rem" height="50rem"/>
            <i> &copy;2020-2021 windoshoppe </i>
            <br/> <br/> <br/> <br/>
            <p>for support</p>
            <p>M-pesa: 0740253367</p>

        </div>
    </div>
    </>
 )
}

export default AppInfo;
