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
        <Menu inverted pointing secondary >

           <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/'
          ><Icon name="home"/></Menu.Item>

          <Menu.Menu position='right' className="Menu_Menu">
           <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as ={Link}
            to= '/login'
            />

            <Menu.Item
              name='Sign-up'
              active={activeItem === 'Sign-up'}
              onClick={handleItemClick}
              as ={Link}
              to= '/register'
            />
          </Menu.Menu>
        </Menu>
      </Segment>
      )

    return menuBar;
}
export default LoggedOutMenu;