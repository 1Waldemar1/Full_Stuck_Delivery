import { useQuery } from "@tanstack/react-query"
import { orderApi } from "../../api/api"

export const OrderPage = () => {
  const query = useQuery(['order'], () => orderApi.getAll())
  console.log(query.data)
  return <div>Order</div>
}