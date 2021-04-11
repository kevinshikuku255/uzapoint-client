import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton} from "../../components/Skeleton/skeleton";
import { Waypoint} from "react-waypoint";

import  "./buyers.css";
import Header from "../../components/Header";
import Buycard from "../../components/Postcard/buyCard";

import { GET_PAGINATED_BUYS} from "../../graphql/buy";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";






/** Buyer component */
function Buyers() {
        UsedocumentTitle("Home");

        const variables = {
          after: null,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading, fetchMore } = useQuery(GET_PAGINATED_BUYS,{
          variables,
          // fetchPolicy:"cache-and-network",
          notifyOnNetworkStatusChange:true,
          });
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
        if(!data || loading ){
          return loader = (
            <div>
              <Header/>
              {skeleton}
            </div>
          )
        }

const { buys, cursor} = data.getPaginatedBuys;
  const main =  buys && (
  <div className="homeContainer">
          { buys.map( (buy, i) =>
            <div className="card" key={buy.id}>
                  { <Buycard  buy={buy}/>}
                  {i === buys.length - 10 &&
                    <Waypoint onEnter={
                      () => fetchMore({
                        variables:{
                          after: cursor,
                          limit: HOME_PAGE_POSTS_LIMIT
                      },
                      updateQuery:(pv,{fetchMoreResult}) => {
                        if(!fetchMoreResult){
                          return pv
                        }
                        return {
                          getPaginatedBuys:{
                           __typename: "BuysConnection",
                           buys: [ ...fetchMoreResult.getPaginatedBuys.buys ],
                           hasMore: fetchMoreResult.getPaginatedBuys.hasMore,
                           cursor: fetchMoreResult.getPaginatedBuys.cursor
                          }
                        }
                      }
                  })} />
                  }
            </div>
            )}
  </div>
  )

 return (
<>
  <Header/>
  {loading && loader}
  {data && !loading  && main}
  {(!loading && !data) && loader }
</>
 )
}

export default Buyers;
