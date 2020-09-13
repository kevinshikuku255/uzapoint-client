import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {Link} from "react-router-dom"

import SignOut from "./App/SignOut"


// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownDropdown = () => {
return(
  <Dropdown  placeholder="- - -" className="Dropdown">
    <Dropdown.Menu >
      <Dropdown.Item  as={Link} to="/Me" >
                Me
       </Dropdown.Item>
      <Dropdown.Item icon='home'text='Home' as ={Link} to= '/'  />
      <Dropdown.Item icon='pencil alternate' text='create post' as ={Link} to= '/createPost' />
      <SignOut />
      <Dropdown.Item icon='question circle outline' text='About' as ={Link} to= '/about'  />

    </Dropdown.Menu>
  </Dropdown>
  )
}

export default DropdownDropdown;