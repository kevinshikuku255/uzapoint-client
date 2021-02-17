import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import SignIn  from "./pages/Auth/SignIn";
import SignUp  from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import AboutUs from "./pages/windoshoppe/about";
import Sell from "./pages/Sell/sell";
import Search from "./pages/Search/index";
import Profile from "./pages/UserInfor/profile";
import UserItems from "./pages/UserInfor/items";
import Item from "./pages/Item/item";
import AuthProfile from "pages/profile/profile";
import EditProfile from "./pages/Profile/editProfile"
import AuthUserSingleItem from "./pages/Profile/item";
import AppInfo from "./pages/windoshoppe/appInfo";
import People from "./pages/People/People";

function App() {
  return (
        <div className="App">
           <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/signin' component={SignIn}/>
              <Route exact path='/signup' component={SignUp}/>
              <Route exact path='/aboutus' component={AboutUs}/>
              <Route exact path='/windoshoppe' component={AppInfo} />
              <Route exact path='/search' component={Search}/>
              <Route exact path='/sell' component={Sell}/>
              <Route exact path='/people' component={People}/>

              <Route exact path="/:username" component={Profile}/>
              <Route exact path="/profile/:username/items" component={UserItems}/>
              <Route exact path='/item/:id' component={Item}/>
              <Route exact path='/item/:id' component={Item}/>

              <Route exact path='/profile/:username' component={AuthProfile}/>
              <Route exact path='/profile/:username/editprofile' component={EditProfile}/>
              <Route exact path='/:username/:id' component={AuthUserSingleItem}/>



           </Switch>
        </div>
  );
}

export default App;
