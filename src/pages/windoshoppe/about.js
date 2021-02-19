import React from 'react'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

import RouteHeader from "../../components/Header/routeHeader";
import Footer from "../../components/Footer";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import  './about.css'









/**About windoshoppe */
const AboutUs = () => {
UsedocumentTitle("AboutUs")
const content =  (
           <div className="aboutUsDescription">
              <ul>
                  <li>Sell and Buy items at a fair price.</li>
                  <li>Incase you're intrested of someone's product Call or WhatsApp the Number on their Bio.</li>
              </ul>
          </div>
                )
    return(
<>
<RouteHeader tag={"windoshoppe"}/>
<div className="container">

<div>

      <div className="aboutCard">
        <h1 className="heading">About Windoshoppe</h1>
        <span>{content}</span>
      </div>

      <div className="aboutCard">
        <h1 className="heading" >CONTACT US</h1>
        <ul>
          <li>Do you want to advertise with us?</li>
          <li>Intrested in what we are doing and want us to keep running.</li>
          <li>Contributions on Quality of our service</li> <br/>
          <li>
            <ul> <a href="tel:0740253367"> Call:<PhoneAndroidIcon/></a> </ul>
            <ul> <a href="https://api.whatsapp.com/send?phone=+254740253367"> WhatsApp: <WhatsAppIcon/> </a> </ul>
          </li>
        </ul>
      </div>

      <div className="aboutCard">
        <h1 className="heading" style={{color:"#d02a2a"}}>DISCLAIMER</h1>
        <p>We dont claim any direct responsibilty for content published on our platform. Users are warned to be  <br/>careful on who the get into transuction with. Content on manupilation, intimidation and descrimination  are not allowed.</p>
      </div>

      <div className="aboutCard">
          <h1 className="heading"> NOTICE: </h1>
          <div className="notice">
            <p style={{color:"gold"}}><DirectionsWalkIcon/></p>
            {" "}
            <p style={{color:"deeppink"}}> Happy selling and Buying </p>
          </div>
      </div>
  </div>
</div>
      <Footer/>
</>
    )
}

export default AboutUs;