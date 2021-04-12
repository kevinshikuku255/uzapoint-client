import React,{useState, useEffect} from 'react';
import {useQuery, useSubscription}  from '@apollo/client';
import {Skeleton} from "../../components/Skeleton/skeleton";
import { useStore } from '../../store';

import Header from "../../components/Header";
import PostCard from "../../components/Postcard/postCard";
import { GET_POSTS, GET_NEW_POST_SUBSCRIPTION} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {CreateItem} from "../../components/CreateItem/CreateItem";
import {NotificationsActive, NotificationsTwoTone} from '@material-ui/icons';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import  "./home.css";


/**Home componen */
function Home() {
        UsedocumentTitle("Home");
         const [{auth}] = useStore();
         const variables = {
          cursor: null,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading} = useQuery(GET_POSTS,{
          variables,
          // fetchPolicy:"cache-and-network",
          });



/* ---------------------------------------------------------------------------------------------- */
       const {data:subs_data, loading:subs_loading} = useSubscription(GET_NEW_POST_SUBSCRIPTION);
       const [open, setOpen] = useState(false);

      useEffect(() => {
          if(!subs_loading && subs_data){
            setOpen(true)
            return
          }
      },[subs_data, subs_loading])

      const hundleClose = (e) => {
          setOpen(false)
      }

/* --------------------------------------------------------------------------------------------------- */




        const skeleton = (
          <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </>
        )

        let loader;
        if(!data){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }


        if(loading){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }

const { posts } = data.getPosts;
  const main =  posts && (
  <div className="homeContainer">
          { posts.map( (post, i) => (
            <div className="card"  key={post.id} >
                  { <PostCard  post={post} index={i}/>}
            </div>
            ))}
  </div>
  )

const infoIcon = !subs_loading && subs_data ?
                     <NotificationsActive style={{color:"blue"}} /> : <NotificationsTwoTone style={{color:"gray"}}/>

 return (
<>
  <Header notification_icon={infoIcon}/>
{
<Snackbar
 open={open}
 anchorOrigin={{
   vertical: 'bottom',
   horizontal: 'left'
 }}
 draggable={true}
 onClose={hundleClose}
 autoHideDuration={5000}
 className="snack_bar"
>
  <SnackbarContent
   style={{backgroundColor:"blue"}}
   message = {"New items "}
  />
</Snackbar>
}

  {loading && loader}
  {data && !loading  && main}
  {(!loading && !data) && loader }

  {auth.user &&
  <div className="createItemForm" >
    <CreateItem/>
  </div>}

</>
 )
}

export default React.memo(Home);
