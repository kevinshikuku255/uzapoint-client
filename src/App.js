import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import AuthRoute from './Utils/authRoute'
import SignIn from "./pages/Auth/SignIn"
import SignUp from "./pages/Auth/SignUp"
import Header from "./components/Header"
import CreatePost from "../src/components/CreatePost"
import SerchBox from "../src/components/SerchBox"
import AboutUs from "./components/AboutUs"



import * as Routes from "./store/routes"

// Prefetch  components
  Routes.Me.load()
  Routes.UserPosts.load()

function App() {
  return (
<>
            <Router >
            <div className=" ui container">
            <Header/>

            <Switch>
                <Route exact path='/' component={Routes.HomeOrExplorePosts}/>
                <AuthRoute exact path='/login' component={SignIn}/>
                <AuthRoute exact path='/register' component={SignUp}/>
                <Route exact path="/posts/:postId" component={Routes.SinglePost}/>
                <Route exact path="/createPost" component={CreatePost}/>
                <Route exact path="/serch" component={SerchBox}/>
                <Route exact path="/profile/:id" component={Routes.Profile}/>
                <Route exact path="/me" component={Routes.Me}/>
                <Route exact path="/about" component={AboutUs}/>
                <Route exact path="/userPosts/:username" component={Routes.UserPosts}/>
            </Switch>
            </div>
          </Router>
</>
  );
}

export default App;
