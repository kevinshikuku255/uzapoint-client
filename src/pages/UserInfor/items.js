import React from 'react';
import {useQuery}  from '@apollo/client';
import RouteHeader from "../../components/Header/routeHeader";
import { GET_USER_POSTS } from '../../graphql/user';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Postgrid from "../../components/PostGrid/postGrid";
import {useRouteMatch} from 'react-router-dom';

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

 if(loading){
   return <h1>Loading...</h1>
 }

 const {posts, count} = data.getUserPosts;

 return (
  <>
  <RouteHeader tag={` ${count} items`}/>
  <div className="prifileGrid">
          { data && posts.map( post =>
            <div className="ProfileGridcard" key={post.id}>
                { <Postgrid  post={post} count={count}/>}
            </div>
            )}
  </div>
  </>
 )
}

export default UserItems;
