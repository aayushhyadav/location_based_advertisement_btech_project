import {useEffect, useState} from "react"
import axios from "axios"
import {VIEW_BUSINESS_API} from "@env"

export default useViewBusiness = () => {
  const [data, setData] = useState(null)

  const getBusiness = async () => {
    try {
      console.log(`${VIEW_BUSINESS_API}`)
      const res = await axios.get(
        `${VIEW_BUSINESS_API}` + "id=" + "62481ba3f3fef3b62b3b420a"
      )
      setData(res)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBusiness()
  }, [])

  return data
}
