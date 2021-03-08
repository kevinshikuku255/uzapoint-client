import {useEffect} from 'react'


/** Custon document title */
const UsedocumentTitle = (value) => {
  useEffect( () => {
    document.title = `Windoshoppe | ${value}`
  },[value])
}

export default UsedocumentTitle;