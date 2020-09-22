import React from 'react';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';



import { useStore } from '../../store';
import { CLEAR_AUTH_USER } from '../../store/auth';

/**
 * Component that signs out the user
 */
const SignOut = (props) => {
  console.log(props)
  const [, dispatch] = useStore();
  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
    localStorage.removeItem('jwt');
  };


  return (
    <>
   {/* <Dropdown.Item icon='sign-out' text='Logout' onClick={handleSignOut}/> */}
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


