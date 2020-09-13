import React  from "react";

import { useStore } from '../../store';
import Explore from "./Explore"
import Home from "./Home"


/**
 * this are posts
 */
const HomeOrExplorePosts = () =>{
 const [{auth}] = useStore()

 return (
  <>
    { auth ? <Explore/> : <Home/>}
  </>
 )




}
export default HomeOrExplorePosts;