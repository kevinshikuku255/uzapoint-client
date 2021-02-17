import {useHistory} from "react-router-dom";
import {useStore} from "../store";
/** Application routes */


function Routes() {
const history = useHistory();
 const [{auth}] = useStore();

const route = {
      backHome: () =>{
       history.push('/')
    },
     sell: () => {
      return history.push('./sell')
   },
    search:  () =>{
       history.push('/search')
    },
    AboutUs:  () =>{
       history.push('/aboutus')
    },
    toPrile:  () =>{
       history.push(`/profile/${auth.user.username}`)
    },
    toAppInfo: () =>{
       history.push(`/windoshoppe`)
    },
    settings: () =>{
       history.push(`/profile/${auth.user.username}/editprofile`)
    },
    toProfile:  () =>{
       history.push(`/profile/${auth.user.username}`)
    },
    toPeople: () => {
      history.push("/people")
   },
   signup: () =>{
      history.push('/signup')
   },
  Login: () =>{
     history.push('/signin')
  },
  goBack: () => {
     history.goBack()
  }
 }

 return route
}

export default Routes
