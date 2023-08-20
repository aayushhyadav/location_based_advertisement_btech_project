import {usePersistentReducer} from "./usePersistentReducer"

const useGlobalState = () => {
  const [globalState, globalDispatch] = usePersistentReducer()
  return {globalState, globalDispatch}
}

export default useGlobalState
