import {useReducer} from "react"
import {initialAppState} from "../store/initialAppState"

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        _id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        aor: action.payload.aor,
      }
    case "LOGOUT":
      return {
        ...initialAppState,
      }
    default:
      return state
  }
}

export function usePersistentReducer() {
  const [state, dispatch] = useReducer(reducer, initialAppState)
  return [state, dispatch]
}
