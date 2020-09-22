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
        <Menu inverted pointing secondary fluid className="menu">
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
            {title === "" && "Explore Items" }
            {title === "createPost" && "Display an Item" }
            {title === "serch" && "Search" }
          </Menu.Item>
        </Menu>
      </Segment>
      )

    return menuBar;
}
export default OtherMenu;































