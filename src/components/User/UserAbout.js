import React,{useState} from 'react'
import {useQuery} from "@apollo/client"
import { Rating,Grid, GridColumn,Image,Icon,Menu } from 'semantic-ui-react'
import SkeletonPost from '../../components/Skeleton';


import { currentDate } from '../../Utils/date';
import {GET_USER_POSTS} from "../../graphql/user";
import UserPosts from "./UserPosts";
import images from "../shoes.jpeg";


/**
 *
 * About user...
 */
  const  UserAbout = ({user}) =>{
  const username = user.username;
  const joinedDate = currentDate(user.createdAt).split(" ")
  const variables = { username, skip: 0 };
  const {data, loading} = useQuery(GET_USER_POSTS,{variables});


 const [active, setActive] = useState({ activeItem: 'items'})
 const  handleItemClick = (e, { name }) => setActive({ activeItem: name })
 const { activeItem } =active


 if(loading){
   return(
    <SkeletonPost/>
   )
 }


 const {posts} = data.getUserPosts;
 return (
  <>
 <Grid>
    <GridColumn mobile={16} tablet={10} computer={7}>
      <Image src={images} fluid/>
    </GridColumn>
 </Grid>


  <div className="gridd">
    <div className="UserInfo">
       <div className="DpInfo">
         <b>{user.username}</b>
       </div>
       <div>
         <button>Follow+</button>
       </div>
       <div>
         <Icon name="bell"/>
       </div>
     </div>

    <div>  <p>User Bio information: </p> </div>
    <div>{<Rating icon='heart' defaultRating={1} maxRating={3} />} </div>
    <div> <p>{`Phone: ${user.phone} `}</p> </div>
    <div className="UserMeta">
        <div>
          <Icon name="cloud"/>{"Nairobi,Ke"}
        </div>
        <div>
         <Icon  name="calendar"/>{`Joined ${joinedDate[0]}, ${joinedDate[2]} `}
        </div>
    </div>
    <div>
        <Menu pointing secondary>
          <Menu.Item
            name='items'
            active={activeItem === 'items'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='sales'
            active={activeItem === 'sales'}
            onClick={handleItemClick}
          />

        </Menu>
    </div>
    <div>
      <UserPosts posts={posts}/>
    </div>
</div>
</>
 )
}

export default UserAbout;