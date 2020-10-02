import React, { lazy, Suspense } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import * as Routes from "./store/routes"



const AuthRoute = lazy(() => import("./Utils/authRoute"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Header = lazy(() => import("./components/Header"));
const CreatePost = lazy(() => import("../src/components/CreatePost"));
const SerchBox = lazy(() => import("../src/components/SerchBox"));
const AboutUs = lazy(() => import("./components/AboutUs"));





// Prefetch  components
  Routes.Me.load()
  Routes.UserPosts.load()

function App() {
  return (
<>
            <Router >
           <Suspense fallback={<div style={{
                                            height:"100vh",
                                            width:"100vw",
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems: "center",
                                            backgroundColor:"#6d6dcc"
                                            }}>

                         <h3> Loading...</h3>
                      </div>}>
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
            </Suspense>
          </Router>
</>
  );
}

export default App;
