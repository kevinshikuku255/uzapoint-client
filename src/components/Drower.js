import React,{useState} from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue} from '@material-ui/core/colors';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';


import SignOut from "../pages/Auth/SignOut"
import logo from "./logo.png"
import Install from "./Install";



const useStyles = makeStyles((theme) => ({
  list: {
    width: 270,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  orange: {
    color: theme.palette.getContrastText(lightBlue[50]),
    backgroundColor: lightBlue[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  div:{
    margin: theme.spacing(4,0,0,13),
    textAlign:"centre"
  },
  h3:{
    margin: theme.spacing(0,0,0,-4),
  }
}));










export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };





  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor,false)}
      onKeyDown={toggleDrawer(anchor,false)}
    >

    <div className={classes.div}>
       <Avatar alt="logo" src={logo} className={classes.orange}/>
       <h3 className={classes.h3}>windoshoppe</h3>
    </div>
     <List>
       <ListItem>
         <ListItemIcon> <PersonOutlineTwoToneIcon /></ListItemIcon>
       <Link to="/Me"><ListItemText primary="Profile" /></Link>
       </ListItem>
     </List>
      <Divider/>
     <List>
       <ListItem>
         <ListItemIcon> <MailIcon /></ListItemIcon>
        <a href="https://www.google.com/gmail/about/"> <ListItemText primary="kevinshikuku254@gmail.com" /> </a>
       </ListItem>
       <ListItem>
         <ListItemIcon> <PhoneAndroidOutlinedIcon /></ListItemIcon>
         <ListItemText primary="0740253367" />
       </ListItem>
       <Divider/>
       <ListItem>
          <ListItemIcon> <InfoTwoToneIcon/></ListItemIcon>
          <Link to="/about"> <ListItemText primary="About us"/> </Link>
       </ListItem>

       <ListItem>
          <ListItemIcon> <ExitToAppTwoToneIcon/> </ListItemIcon>
          <ListItemText primary={<SignOut/>}/>
       </ListItem>
       <Divider/>

       <ListItem>
          <ListItemText primary={<Install/>}/>
       </ListItem>
     </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
              onClick={toggleDrawer(anchor, true)}
              edge="end" className={classes.menuButton}
              color="inherit"
              aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
