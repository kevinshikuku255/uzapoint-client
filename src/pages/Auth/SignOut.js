import React from 'react';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';



import { useStore} from '../../store';
import { CLEAR_AUTH_USER } from '../../store/auth';

/**
 * Component that signsOut the user
 */
const SignOut = () => {
  const [, dispatch] = useStore();
  
  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
    localStorage.removeItem("jwt");
  };


  return (
    <>
    <List>
       <ListItem>
         <ListItemIcon> <ExitToAppTwoToneIcon /></ListItemIcon>
         <ListItemText primary="Log Out" onClick={handleSignOut}/>
       </ListItem>
  </List>
   </>
  );
};


export default SignOut;


