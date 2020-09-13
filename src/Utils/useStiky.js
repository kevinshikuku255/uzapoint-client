import { useEffect, useState, useCallback } from "react"
import  {debounce} from 'lodash';
function useSticky() {
  const [isSticky, setSticky] = useState(false)


const handleScroll = useCallback( ()=>{
  var prevScrollpos = window.pageYOffset;
   window.onscroll = ()=>{
    let currentScrollPos = window.pageYOffset;
    prevScrollpos > currentScrollPos ? setSticky(!true): setSticky(!false)
    prevScrollpos = currentScrollPos;
   }
},[])


  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll,500))
    return () => {
      window.removeEventListener("scroll", () => handleScroll)
    }
  }, [ handleScroll])

  return { isSticky}
}

export default useSticky;
