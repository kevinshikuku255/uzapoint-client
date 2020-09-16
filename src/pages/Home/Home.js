import React from 'react'
import {useQuery}  from '@apollo/client'
import {Grid, Transition,  GridColumn } from "semantic-ui-react"


import {GET_FOLLOWED_POSTS} from "../../graphql/post"
import { useStore } from '../../store';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton"

import PostCard from "../../components/PostCard";


const Home = () =>{
  const [{auth}] = useStore()
  const variables = {
    userId: auth.user.id,
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading} = useQuery(GET_FOLLOWED_POSTS,{
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy:"cache-and-network",
    update(proxy){
       console.log(proxy)
    }
    });
if(loading){
   return <SkeletonPost/>
}


console.log(data)
 return (
    <Grid className={ auth.user ? "HomeGrid" : "HomeGridd"} inverted>
        <GridColumn mobile={16} tablet={10} computer={8} className="HomeGridColumn">
            <Grid.Row >
               <Transition.Group >
               { data && data.getFollowedPosts.posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:15}}  >
                     <PostCard  post={post}/>
                  </Grid.Column>
                  )}
               </Transition.Group>
            </Grid.Row>
        </GridColumn>
    </Grid>
 )
}
export default Home;