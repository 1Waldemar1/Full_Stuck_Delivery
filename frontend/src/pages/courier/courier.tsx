import { useQuery } from "@tanstack/react-query"
import { courierApi } from "../../api/api"

export const CourierPage = () => {
  const query = useQuery(['courier'], () => courierApi.getAll())
  console.log(query.data)
  return <div>Courier</div>
}