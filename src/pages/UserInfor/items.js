import React from 'react';
import {useQuery}  from '@apollo/client';
import RouteHeader from "../../components/Header/routeHeader";
import { GET_USER_POSTS } from '../../graphql/user';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Postgrid from "../../components/PostGrid/postGrid";
import {useRouteMatch} from 'react-router-dom';
import {LinearProg, SkeletonPost,SkeletonBar2 } from "../../components/Skeleton/skeleton";

/**User items */
function UserItems() {

const location = useRouteMatch();
const username = location.params.username.split(':').pop()
const variables = {
  username,
  skip: 0,
  limit: HOME_PAGE_POSTS_LIMIT,
};


 const { data,loading} = useQuery(GET_USER_POSTS,{ variables });

let loader;
 if(loading){
   return(
     <div>
       <RouteHeader tag={` 0 Items`}/>
       <LinearProg/>
       <SkeletonPost/>
       <SkeletonBar2/><br/>

       <SkeletonPost/>
       <SkeletonBar2/><br/>

       <SkeletonPost/>
       <SkeletonBar2/><br/>

       <SkeletonPost/>
       <SkeletonBar2/><br/>
       
       <SkeletonPost/>
       <SkeletonBar2/><br/>
       <h1>Loading...</h1>
     </div>
   )
 }

 const {posts, count} = data.getUserPosts;

const main = (
  <div className="prifileGrid">
          { data && posts.map( post =>
            <div className="ProfileGridcard" key={post.id}>
                { <Postgrid  post={post} count={count}/>}
            </div>
            )}
  </div>
)

 return (
  <>
  <RouteHeader tag={` ${count} items`}/>
  {loading ? loader : main}
  </>
 )
}

export default UserItems;
