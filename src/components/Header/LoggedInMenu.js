import React,{useState} from 'react'
import DropdownDropdown from "../DropDown"
import { Menu,Segment, Icon,Grid } from 'semantic-ui-react'
import {Link} from "react-router-dom"



import NavBar from "../StickyNav"
import useSticky from "../../Utils/useStiky"


function LoggedInMenu() {


 const pathName = window.location.pathname;
 const path = pathName === "/" ? "home" : pathName.substr(1)

 const [activeItem , setActiveItem] = useState(path)
 const  handleItemClick = (e, { name }) => setActiveItem(name);
 const { isSticky } = useSticky()

const menuBar = (
  <>
<Grid>
  <Grid.Column mobile="16" computer="7" tablet="10">
 <Segment inverted className="Menu" >
       <NavBar sticky={isSticky}/>
       <Menu inverted pointing secondary fluid className="menu">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/'
          >
            <Icon name="home"/>
          </Menu.Item>
           <Menu.Item name= "notification"
            active={activeItem === 'notification'}
            onClick={handleItemClick}>
            <Icon name="bell"/>
          </Menu.Item>
           <Menu.Item
            name= "commnet"
            active={activeItem === 'commnet'}
            onClick={handleItemClick}
            as ={Link}
            to= "/createPost"
          >
          <Icon name='pencil alternate'  />
          </Menu.Item>


         <Menu.Menu position='right'>
             <Menu.Item>
               <DropdownDropdown/>
             </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
  </Grid.Column>
</Grid>
 </>)

    return menuBar;
}
export default LoggedInMenu;