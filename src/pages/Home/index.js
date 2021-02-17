import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton,LinearProg} from "../../components/Skeleton/skeleton";

import  "./home.css";
import Header from "../../components/Header";
import PostCard from "../../components/Postcard/postCard";

import {GET_POSTS} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";





/**Home componen */
function Home() {
        UsedocumentTitle("Home");

        const variables = {
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading } = useQuery(GET_POSTS,{variables});

 const skeleton = (
  <>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
  </>
 )

  let loader;
  if(loading){
    return loader = (
      <div>
        <Header/>
        <LinearProg/>
        {skeleton}
      </div>
    )
  }

  if(!loading && !data){
    return loader = (
      <div>
        <Header/>
        <LinearProg/>
        {skeleton}
      </div>
    )
  }

const { posts} = data.getPosts;

  const main = (
  <div className="homeContainer">
          { data && posts.map( post =>
            <div className="card" key={post.id}>
                { <PostCard  post={post}/>}
            </div>
            )}
  </div>
  )


 return (
<>
  <Header/>
  {loading && loader}
  {!loading && data && main}
  {(!loading && !data) ? loader : main}
</>
 )
}

export default Home;
