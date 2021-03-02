import React from 'react';
import { ArrowBack} from '@material-ui/icons';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
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
            <p>version 0.1.0</p>
            <p>By kevin shikuku </p>
            <i> &copy; 2020-2021 windoshoppe </i>
            <br/> <br/>
            <p>To support development of this application</p>
            <p>M-pesa: 0740253367</p>

        </div>
    </div>
    </>
 )
}

export default AppInfo;
