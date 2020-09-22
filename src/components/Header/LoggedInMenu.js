import React,{useState} from 'react'
import Drower from "../Drower"
import { Menu,Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom"

import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';



function LoggedInMenu() {
    const pathName = window.location.pathname;
    const path = pathName === "/" ? "home" : pathName.substr(1);

    const [activeItem , setActiveItem] = useState(path);
    const  handleItemClick = (e, { name }) => setActiveItem(name);


const menuBar = (
  <>
 <Segment inverted className="Menu" >
       <Menu inverted pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/'
          > <HomeIcon/>
          </Menu.Item>

           <Menu.Item
            name= "notification"
            active={activeItem === 'notification'}
            onClick={handleItemClick}
            as={Link}
            to="/serch"
            >
              <SearchIcon/>
           </Menu.Item>

           <Menu.Item
            name= "create Post"
            active={activeItem === 'commnet'}
            onClick={handleItemClick}
            as ={Link}
            to= "/createPost"
          >
           <CreateIcon />
          </Menu.Item>
         <Menu.Menu position='right'>
             <Menu.Item>
               <Drower/>
             </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>

 </>)

    return menuBar;
}
export default LoggedInMenu;