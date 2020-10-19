import React,{useState} from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue} from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


import SignOut from "../pages/Auth/SignOut"
import logo from "./logo.png"
import shoes from "./shoes.jpeg"
import Install from "./Install";
import { useStore } from "../store";



const useStyles = makeStyles((theme) => ({
  list: {
    width: 270,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position:"absolute", right:"0",
  },
  title: {
    flexGrow: 1,
  },
   logo: {
    color: theme.palette.getContrastText(lightBlue[50]),
    backgroundColor: lightBlue[500],
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(lightBlue[50]),
    backgroundColor: lightBlue[500],
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginTop:"5rem",
  },
  div:{
    border:"1px solid gray",
    backgroundColor: lightBlue[500],
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    height: "7rem",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  },
  h3:{
    margin: theme.spacing(0,0,0,0),
    textTransform: "capitalize",
  }
}));










export default function AppDrawer() {
  const classes = useStyles();
  const [{auth}] = useStore();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };



const coverImage = auth.user.coverImage ? auth.user.coverImage : shoes;
const avator = auth.user.image ? auth.user.image : logo;

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor,false)}
      onKeyDown={toggleDrawer(anchor,false)}
    >

    <div className={classes.div} style={{backgroundImage:`url(${coverImage})`}}>
      <Link to="/Me">
        <Avatar alt="logo" src={avator} className={classes.orange}/>
      </Link>
       <h3 className={classes.h3}>{auth.user.username}</h3>
    </div>
      <br/>
     <List>
       <ListItem>
         <ListItemIcon> <PersonOutlineTwoToneIcon /></ListItemIcon>
       <Link to="/Me"><ListItemText primary="Profile" /></Link>
       </ListItem>
       <ListItem>
         <ListItemIcon> <SettingsIcon/></ListItemIcon>
          <ListItemText primary="settings" />
       </ListItem>
     </List>
{/* -------------------------------------------------------------------------- */}
      <Divider/>
     <List>
       <ListItem>
          <ListItemIcon> <InfoTwoToneIcon/></ListItemIcon>
          <Link to="/about"> <ListItemText primary="About us"/> </Link>
       </ListItem>
       <ListItem>
         <ListItemIcon> <Avatar alt="logo" src={logo} className={classes.logo} /></ListItemIcon>
            <ListItemText primary="Windoshoppe"/>
       </ListItem>
       <ListItem>
          <ListItemIcon> <PowerSettingsNewIcon/> </ListItemIcon>
          <ListItemText primary={<SignOut/>}/>
       </ListItem>
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
