import React from 'react'
import images from "./images.jpeg"


/**
 * User display photo
 */
function Dp() {
 return (
  <div className="DispalyPhotoCover">
    <img   src={images} alt="Dp" className="Dp"/>
  </div>
 )
}
export default Dp;
