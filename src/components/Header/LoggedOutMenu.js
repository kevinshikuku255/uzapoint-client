import React,{useState} from 'react'
import { Menu,Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom"

import HomeIcon from '@material-ui/icons/Home';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  i: {
  color:"rgb(255, 192, 225)",
  fontSize: "small",
  }
}));


function LoggedOutMenu() {
 const classes = useStyles();
 const pathName = window.location.pathname;
 const path = pathName === "/" ? "home" : pathName.substr(1)

 const [activeItem , setActiveItem] = useState(path)
 const  handleItemClick = (e, { name }) => setActiveItem(name);

  const titleString = window.location.pathname;
  const title = titleString.split("/")[1]



const menuBar = (
  <>
{ title === "about" ?
 <Segment inverted className="Menu">
   <Menu inverted pointing secondary >
           <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/Explore'
          ><HomeIcon/>

          </Menu.Item>
          <Menu.Item/>
          <Menu.Item/>
          <Menu.Item >
             <i className={classes.i}>About us</i>
          </Menu.Item>
   </Menu>
 </Segment>
: <Segment inverted className="Menu">
        <Menu inverted pointing secondary >
           <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as ={Link}
            to= '/Explore'
          ><HomeIcon/></Menu.Item>

          <Menu.Item>
            {title === "" && <i className={classes.i} >Explore Items</i> }
            {title === "login" && <i className={classes.i} >Login</i> }
            {title === "register" && <i className={classes.i} >Create account</i> }
          </Menu.Item>

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
  </Segment>}
  </>
      )

    return menuBar;
}
export default LoggedOutMenu;