import useGlobalState from "../hooks/useGlobalState"
import Context from "./context"

export default GlobalStateProvider = ({children}) => {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  )
}
