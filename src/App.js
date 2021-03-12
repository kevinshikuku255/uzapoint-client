import dotenv from 'dotenv';
import React,{useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import ReactGA from 'react-ga';
dotenv.config();


ReactGA.initialize("G-QDX26EEZTX");


const SignIn  = React.lazy( () => import("./pages/Auth/SignIn"));
const SignUp  = React.lazy( () => import("./pages/Auth/SignUp"));
const Home = React.lazy( () => import("./pages/Home"));
const AboutUs = React.lazy( () => import("./pages/windoshoppe/about"));
const Sell = React.lazy( () => import("./pages/Sell/sell"));
const Buy = React.lazy( () => import("./pages/Buy/Buy"));
const Buyers = React.lazy( () => import("./pages/Buyers/Buyers"));
const Search = React.lazy( () => import("./pages/Search/index"));
const Profile = React.lazy( () => import("./pages/UserInfor/profile"));
const UserItems = React.lazy( () => import( "./pages/UserInfor/items"));
const UserBuys = React.lazy( () => import( "./pages/UserInfor/buys"));
const Item = React.lazy( () => import( "./pages/Item/item"));
const BuyItem = React.lazy( () => import( "./pages/Item/buy"));
const AuthProfileComponent = React.lazy( () => import( "./pages/Profile/AuthUserProfile"));
const EditProfile = React.lazy( () => import("./pages/Profile/editProfile"));
const AuthUserSingleItem = React.lazy( () => import("./pages/Profile/item"));
const AppInfo = React.lazy( () => import( "./pages/windoshoppe/appInfo"));
const People = React.lazy( () => import("./pages/People/People"));




function App() {
 const fall_back = (
    <div className="fallback">
     <div className="header"/>
     <p>windoshoppe</p>
    </div>
 )

useEffect( () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
} )


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
                  <Route exact path='/buy' component={Buy}/>
                  <Route exact path='/buyers' component={Buyers}/>
                  <Route exact path='/people' component={People}/>

                  <Route exact path="/:username" component={Profile}/>
                  <Route exact path="/profile/:username/items" component={UserItems}/>
                  <Route exact path="/profile/:username/buys" component={UserBuys}/>
                  <Route exact path='/item/:id' component={Item}/>
                  <Route exact path='/buyitem/:id' component={BuyItem}/>

                  <Route exact path='/profile/:username' component={AuthProfileComponent}/>
                  <Route exact path='/profile/:username/editprofile' component={EditProfile}/>
                  <Route exact path='/:username/:id' component={AuthUserSingleItem}/>
             </Switch>
           </React.Suspense>
        </div>
  );
}

export default withRouter(App);
