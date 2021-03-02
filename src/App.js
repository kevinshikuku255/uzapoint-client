import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';


const SignIn  = React.lazy( () => import("./pages/Auth/SignIn"));
const SignUp  = React.lazy( () => import("./pages/Auth/SignUp"));
const Home = React.lazy( () => import("./pages/Home"));
const AboutUs = React.lazy( () => import("./pages/windoshoppe/about"));
const Sell = React.lazy( () => import("./pages/Sell/sell"));
const Search = React.lazy( () => import("./pages/Search/index"));
const Profile = React.lazy( () => import("./pages/UserInfor/profile"));
const UserItems = React.lazy( () => import( "./pages/UserInfor/items"));
const Item = React.lazy( () => import( "./pages/Item/item"));
const AuthProfileComponent = React.lazy( () => import( "./pages/Profile/AuthUserProfile"));
const EditProfile = React.lazy( () => import("./pages/Profile/editProfile"));
const AuthUserSingleItem = React.lazy( () => import("./pages/Profile/item"));
const AppInfo = React.lazy( () => import( "./pages/windoshoppe/appInfo"));
const People = React.lazy( () => import("./pages/People/People"));


function App() {
 const fall_back = (
    <div className="fallback">
     <div className="header"/>
     <p>windoshoppe...</p>
    </div>
 )

  return (
        <div className="App">
           <React.Suspense fallback={ <div>{fall_back}</div>}>
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

                  <Route exact path='/profile/:username' component={AuthProfileComponent}/>
                  <Route exact path='/profile/:username/editprofile' component={EditProfile}/>
                  <Route exact path='/:username/:id' component={AuthUserSingleItem}/>
             </Switch>
           </React.Suspense>
        </div>
  );
}

export default App;
