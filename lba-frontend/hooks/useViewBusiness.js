import {useEffect, useState} from "react"
import axios from "axios"
import {REACT_APP_VIEW_BUSINESS_API} from "@env"

export default useViewBusiness = () => {
  const [data, setData] = useState(null)

  const getBusiness = async () => {
    try {
      console.log(`${REACT_APP_VIEW_BUSINESS_API}`)
      const res = await axios.get(
        `${REACT_APP_VIEW_BUSINESS_API}` + "id=" + "62481ba3f3fef3b62b3b420a"
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
