import React from 'react'
import {useQuery}  from '@apollo/client'
import {Grid, Transition,  GridColumn } from "semantic-ui-react"


import InfiniteScroll from '../../components/InfiniteScroll';
import {GET_POSTS} from "../../graphql/post"
import { useStore } from '../../store';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton"

import PostCard from "../../components/PostCard";


const Expolore = () =>{
  const [{auth}] = useStore()
  const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading,fetchMore} = useQuery(GET_POSTS, {variables});

if(loading){
   return <SkeletonPost/>
}
const { posts} = data.getPosts.posts
 return (
  <InfiniteScroll
   data={posts}
   dataKey="getPosts.posts"
   count={parseInt(count)}
   variables={variables}
   fetchMore={fetchMore}
 >
    <Grid className={ auth.user ? "HomeGrid" : "HomeGridd"} inverted>
        <GridColumn mobile={16} tablet={10} computer={8} className="HomeGridColumn">
            <Grid.Row >
               <Transition.Group >
               { data && data.getPosts.posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:15}}  >
                     <PostCard  post={post}/>
                  </Grid.Column>
                  )}
               </Transition.Group>
            </Grid.Row>
        </GridColumn>
    </Grid>
</InfiniteScroll>
 )
}
export default Expolore;