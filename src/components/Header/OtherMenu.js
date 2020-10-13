import React,{useState} from 'react'
import { Menu,Segment } from 'semantic-ui-react'
import {Link} from "react-router-dom"

import HomeIcon from '@material-ui/icons/Home';






function OtherMenu() {
 const pathName = window.location.pathname;
 const path = pathName === "/" ? "home" : pathName.substr(1)

  const titleString = window.location.pathname;
  const title = titleString.split("/")[1]


  const [activeItem , setActiveItem] = useState(path)
  const  handleItemClick = (e, { name }) => setActiveItem(name);


const menuBar = (

  <Segment inverted className="Menu" >
        <Menu  inverted pointing secondary>
           <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/'
          >
             <HomeIcon/>
          </Menu.Item>
          <Menu.Item>
                {title === "" && <i>Explore Items</i> }
                {title === "createPost" && <i>Display an Item</i> }
                {title === "serch" && <i>Search</i> }
                {title === "about" && <i >About us</i> }
                {title === "Me" && <i>Profile</i> }
          </Menu.Item>
        </Menu>
   </Segment>
      )

    return menuBar;
}
export default OtherMenu;































