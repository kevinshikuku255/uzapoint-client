import React from 'react';

import Other from "../../components/Header/otherHeader";
import "./sell.css";






import { useStore } from '../../store';

/**Sell component */
function Sell() {
        const [{auth}] = useStore();

console.log(auth)



    return (
   <>
     <Other tag="Sell"/>
     <div className="sellContainer">
       <h1>Happy selling</h1>
     </div>
   </>
    )
}

export default Sell;
