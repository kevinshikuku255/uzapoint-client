// import React from "react"
import loadable from "@loadable/component";





// const fallBack = <div style={{
//                               height:"100vh",
//                               width:"100vw",
//                               display:"flex",
//                               justifyContent:"center",
//                               alignItems: "center",
//                               backgroundColor:"rgb(225, 34, 193)"
//                               }}>
//                    <h3>Loading...</h3>
//                  </div>


export const HomeOrExplorePosts  = loadable( () => import("../pages/Home"));
export const UserPosts  = loadable( () => import("../components/User/UserPosts"), {fallback:"Loading"})
export const Me  = loadable( () => import("../components/User/Me"))
export const Profile  = loadable( () => import("../pages/Profile/Profile"))
export const SinglePost  = loadable( () => import("../components/SinglePost"))


