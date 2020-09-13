import React from 'react'
import Skeleton from 'react-loading-skeleton';


/**
 * Skeleton posts
 */
const  SkeletonPost = () =>{
 return (
      <>
      <h1> <Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      <h1><Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      <h1><Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      <h1><Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      <h1><Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      <h1><Skeleton count={1} /></h1>
       <p><Skeleton count={5} /></p>
      </>
 )
}

export default SkeletonPost;