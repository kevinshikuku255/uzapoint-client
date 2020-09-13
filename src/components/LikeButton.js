import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Icon, Button } from "semantic-ui-react"


function LikeButton( { user} ){
      const [liked] = useState(false);
      //   const  [{auth}]  = useStore();
// //.....................................use mutation ......................
//   const [likePost] = useMutation(LIKE_POST_MUTATION, {
//         variables: {postId: id},
//         onError(err){
//            console.log(err.message)
//         }
//     })
// //................................... setting the like boolean .............................

//       useEffect(()=>{
//         if(user  &&  likes.find(like => like.username === user.username)){
//           setLiked(true)
//         }else{
//           setLiked(false)
//         }
//       },[likes,user])




//...........................................button logic ...................
 const likeButton = user ? (
     liked ? (
       <Button color="teal"  size="tiny" onClick={"j"} circular>
            <Icon name="thumbs up outline"/>
       </Button>
     ):(
       <Button color="teal" basic size="tiny" circular>
            <Icon name="thumbs up outline" />
       </Button>
     )
 ):(
    <Button as={Link} to='/login' color="teal" basic size="tiny" circular>
        <Icon name="thumbs up outline"/>
    </Button>
 )

  return(
  <>

    {likeButton}

  </>
  )

}

export default LikeButton;









