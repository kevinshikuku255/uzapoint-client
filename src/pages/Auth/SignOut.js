import React from 'react';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
       <ListItem  onClick={handleSignOut}>
         <ListItemIcon> Log out <ExitToAppTwoToneIcon /> </ListItemIcon>
       </ListItem>
  </List>
   </>
  );
};


export default SignOut;


