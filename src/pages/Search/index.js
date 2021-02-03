import React,{useState} from 'react';
import {useQuery} from "@apollo/client";
import {useDebounce} from "../../Utils/useDebounce";

import OtherHeader from "../../components/Header/otherHeader";
import { SEARCH_POSTS } from "../../graphql/post";
import  SerchResult from "./searchResult";
import "./search.css"


/**Search component */
const  Search = () => {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
      setValue( e.target.value )
      }
   const debouncedValue = useDebounce(value, 500)

  const {data, loading} = useQuery(SEARCH_POSTS, {variables:{searchQuery:debouncedValue}});



  let loader;
    if(loading && !data){
      loader = (
        <div className="searching">
          <h4>Searching....</h4>
        </div>
      )
    }

   let searchResults;
     if(data && !loading){
       searchResults = data.searchPosts
     }

    const searchInput = (
                          <div>
                            <input type="Search" onChange={handleChange} value={value} placeholder="search..." autoFocus />
                          </div>
                     )


      return (
     <>
       <OtherHeader tag={searchInput}/>
       <div className="searchContainer" >
          { loader ||
            <div>
              {searchResults.map( post => (
                <div key={post.id}>
                  <SerchResult post={post}/>
                </div>
              ))}
             </div>
            }
       </div>
     </>
      )
}

export default Search;
