import React,{Suspense} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import * as Routes from "./store/routes";



import SignIn  from "./pages/Auth/SignIn";
import SignUp  from "./pages/Auth/SignUp";
import Header  from "./components/Header";
import AboutUs from  "./components/AboutUs";
import Explore from "./pages/Home/Explore"




// Prefetch  components
  Routes.Me.load()
  Routes.UserPosts.load()

function App() {
  return (
<>
            <Router >
              <Suspense fallback={<div style={{
                                            display:"flex",
                                            height:"100vh",
                                            width:"100vw",
                                            justifyContent:"center",
                                            alignItems: "center",
                                            backgroundColor: "#6d6dcc"
                                          }}>

                               </div>}>
             <div className=" ui container">
                  <Header/>
                  <Switch>
                        <Route exact path='/login' component={SignIn}/>
                        <Route exact path='/register' component={SignUp}/>
                        <Route exact path="/Explore" component={Explore}/>
                        <Route exact path="/posts/:postId" component={Routes.SinglePost}/>
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
