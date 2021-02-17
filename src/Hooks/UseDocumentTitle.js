import {useEffect} from 'react'


/** Custon document title */
function UsedocumentTitle(value) {
  useEffect( () => {
    document.title = `Windoshoppe | ${value}`
  },[value])
}

export default UsedocumentTitle;