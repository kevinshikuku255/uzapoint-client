import React,{useState} from 'react'
import {useQuery} from "@apollo/client"
import { Rating,Grid, GridColumn,Icon,Menu } from 'semantic-ui-react'
import SkeletonPost from '../../components/Skeleton';


import Dp from "../Dp"
import { currentDate } from '../../Utils/date';
import {GET_AUTH_USER} from "../../graphql/user";
import UserPosts from "./UserPosts";
import UserSales from './UserSales';


/**
 *
 * About auth user...
 */
  const  UserAbout = () =>{

  const {data, loading} = useQuery(GET_AUTH_USER,{
    fetchPolicy:"cache-and-network"
  });

  const [active, setActive] = useState({ activeItem: 'items'})
  const  handleItemClick = (e, { name }) => setActive({ activeItem: name })
  const { activeItem } =active


 if(loading){
   return(

  <Grid className="Me">
    <GridColumn mobile={16} tablet={10} computer={7}>
         <SkeletonPost/>
    </GridColumn>
 </Grid>
   )
 }

  if(!loading && !data){
   return(
     <SkeletonPost/>
   )
 }

 const { phone,  username, posts, followers, createdAt} = data.getAuthUser;

const joinedDate = currentDate(createdAt).split(" ")
 return (
  <div>
 <Grid className="Me">
    <GridColumn mobile={16} tablet={10} computer={7}>
      <Dp/>
    </GridColumn>
 </Grid>


  <div className="gridd">
    <div className="UserInfo">
       <div className="DpInfo">
         <b>{username}</b>
       </div>
       <div>
         <button>{`Followers ${followers.length}`}</button>
       </div>
       <div>
         <Icon name="bell"/>
       </div>
     </div>

    <div className="userBio" >
          <div>User Bio information: </div>
    </div>
    <div>{<Rating icon='heart' defaultRating={1} maxRating={3} />} </div>
    <div> <p>{`Phone: ${phone} `}</p> </div>
    <div className="UserMeta">
        <div>
          <Icon name="cloud"/>{"Nairobi,Ke"}
        </div>
        <div>
         <Icon  name="calendar"/>{`Joined ${joinedDate[0]}, ${joinedDate[2]}`}
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
      { activeItem === "items" ? <UserPosts posts={posts}/>
         : activeItem === "sales" ?  <UserSales/> : " " }
    </div>
</div>
</div>
 )
}

export default UserAbout;