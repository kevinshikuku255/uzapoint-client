import React from 'react';
import { ArrowBack} from '@material-ui/icons';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import Routes from "../../store/routes";
import './about.css';

/** more infor about windoshoppe */
function AppInfo() {
    const {goBack} = Routes()
    UsedocumentTitle("AppInfo")


    return (
    <>
    <div >
        <div className="app_info_bar" >
            <p style={{cursor:"pointer"}} onClick={goBack}> <ArrowBack/> </p>
        </div>
        <div className="app_Info_component">
            <h1>Windoshoppe</h1>
            <p className="description">Buy and Sell Anything!</p>
            <p  className="description"> At best prices</p>
            <br/> <br/>
            <i> &copy; 2020-2021 windoshoppe </i>
        </div>
    </div>
    </>
 )
}

export default AppInfo;
