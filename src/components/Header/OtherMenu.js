import React,{useState} from 'react'
import { Menu,Segment, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom"



function LoggedOutMenu() {

 const pathName = window.location.pathname;
 const path = pathName === "/" ? "home" : pathName.substr(1)

 const [activeItem , setActiveItem] = useState(path)
 const  handleItemClick = (e, { name }) => setActiveItem(name);


const menuBar = (
 <Segment inverted className="Menu">
        <Menu inverted  secondary >

           <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/'
          >
            <Icon name="home"/>
          </Menu.Item>
        </Menu>
      </Segment>
      )

    return menuBar;
}
export default LoggedOutMenu;