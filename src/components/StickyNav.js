import React from "react";
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom"



const NavBar = () => (

 <nav>

<div>
 <div className="StickyNav">

  <div className="Logo">
    WindowShop
  </div>
  <div className="SearchIcon">
    <Link to="/serch"> <Icon name="search"/> </Link>
  </div>
 </div>
</div>


 </nav>
)

export default NavBar;