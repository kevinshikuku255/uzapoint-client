import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton} from "../../components/Skeleton/skeleton";

import  "./home.css";
import Header from "../../components/Header";
import PostCard from "../../components/Postcard/postCard";

import {GET_POSTS} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';




/**Home componen */
function Home() {

        const variables = {
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading} = useQuery(GET_POSTS,{variables});

        let loader;
        if(loading){
         return loader = (
            <div>
              <Header/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
            </div>
          )
        }

        if(!loading && !data){
         return loader = (
            <div>
              <Header/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
            </div>
          )
        }


        const { posts} = data.getPosts;



 return (
<>
  <Header/>
{ (loading && !data ) ? loader :
  <div className="homeContainer">
          { data && posts.map( post =>
            <div className="card" key={post.id}>
                { <PostCard  post={post}/>}
            </div>
            )}
  </div>
}
</>
 )
}

export default Home;
