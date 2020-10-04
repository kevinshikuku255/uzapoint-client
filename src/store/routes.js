import {lazy} from "@loadable/component";








export const UserPosts  =lazy( () => import("../components/User/UserPosts"))
export const Me  = lazy( () => import("../components/User/Me"))
export const Profile  = lazy( () => import("../pages/Profile/Profile"))
export const SinglePost  = lazy( () => import("../components/SinglePost"))


