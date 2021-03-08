import React from 'react';
import {useQuery}  from '@apollo/client';
import {Skeleton,LinearProg} from "../../components/Skeleton/skeleton";
import { Waypoint} from "react-waypoint";

import  "./buyers.css";
import RouteHeader from "../../components/Header/routeHeader";
import Buycard from "../../components/Postcard/buyCard";

import { GET_PAGINATED_BUYS} from "../../graphql/buy";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";






/** Buyer component */
function Buyers() {
        UsedocumentTitle("Home");

        const variables = {
          after: null,
          limit: HOME_PAGE_POSTS_LIMIT,
        };

        const { data,loading, fetchMore } = useQuery(GET_PAGINATED_BUYS,{variables});
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
              <RouteHeader/>
              <LinearProg/>
              {skeleton}
            </div>
          )
        }

        if(!loading && !data){
          return loader = (
            <div>
              <RouteHeader/>
              <LinearProg/>
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
  <RouteHeader tag={"People want to buy"}/>
  {loading && loader}
  {data && !loading  && main}
  {(!loading && !data) && loader }
</>
 )
}

export default Buyers;
