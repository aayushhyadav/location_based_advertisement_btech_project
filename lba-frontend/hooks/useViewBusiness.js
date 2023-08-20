import {useEffect, useState, useContext} from "react"
import axios from "axios"
import {REACT_APP_VIEW_BUSINESS_API} from "@env"
import Context from "../store/context"

export default useViewBusiness = () => {
  const [data, setData] = useState(null)
  const {globalState} = useContext(Context)

  const getBusiness = async () => {
    try {
      console.log(`${REACT_APP_VIEW_BUSINESS_API}`)
      const res = await axios.get(
        `${REACT_APP_VIEW_BUSINESS_API}id=${globalState._id}`
      )
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBusiness()
  }, [])

  return data
}
