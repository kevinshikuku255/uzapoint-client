import React from 'react';

import Other from "../../components/Header/otherHeader";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import "./sell.css";
import PostForm from "../../components/CreateItem/CreateItem";


/**Sell component */
function Sell() {
        UsedocumentTitle("Sell")



    return (
   <>
     <Other tag="Display an item to sell"/>
     <div className="sellContainer">
       <PostForm/>
     </div>
   </>
    )
}

export default Sell;
