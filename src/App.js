import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import AuthRoute from './Utils/authRoute'
import HomeOrExplorePosts from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Header from "./components/Header";
import SinglePost from './components/SinglePost'
import CreatePost from "../src/components/CreatePost"
import SerchBox from "../src/components/SerchBox"
import Profile from "./pages/Profile/Profile"
import AboutUs from "./components/AboutUs"
import Me from "./components/User/Me"

function App() {
  return (
<>
            <Router >
            <div className=" ui container">
            <Header/>

            <Switch>
                <Route exact path='/' component={HomeOrExplorePosts}/>
                <AuthRoute exact path='/login' component={SignIn}/>
                <AuthRoute exact path='/register' component={SignUp}/>
                <Route exact path="/posts/:postId" component={SinglePost}/>
                <Route exact path="/createPost" component={CreatePost}/>
                <Route exact path="/serch" component={SerchBox}/>
                <Route exact path="/profile/:id" component={Profile}/>
                <Route exact path="/me" component={Me}/>
                <Route exact path="/about" component={AboutUs}/>
            </Switch>
            </div>
          </Router>
</>
  );
}

export default App;
