import React,{useState} from 'react'
import { Menu,Segment } from 'semantic-ui-react'
import {Link} from "react-router-dom"

import HomeIcon from '@material-ui/icons/Home';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  i: {
  color:"rgb(255, 192, 225)",
  fontSize: "small",
  }
}));














function OtherMenu() {
 const classes = useStyles();
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
            {title === "" && <i className={classes.i}>Explore Items</i> }
            {title === "createPost" && <i className={classes.i}>Display an Item</i> }
            {title === "serch" && <i className={classes.i} >Search</i> }
          </Menu.Item>
        </Menu>
      </Segment>
      )

    return menuBar;
}
export default OtherMenu;































