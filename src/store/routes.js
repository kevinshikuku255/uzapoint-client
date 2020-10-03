import loadable from "@loadable/component";







export const HomeOrExplorePosts  = loadable( () => import("../pages/Home"));
export const UserPosts  = loadable( () => import("../components/User/UserPosts"))
export const Me  = loadable( () => import("../components/User/Me"))
export const Profile  = loadable( () => import("../pages/Profile/Profile"))
export const SinglePost  = loadable( () => import("../components/SinglePost"))


