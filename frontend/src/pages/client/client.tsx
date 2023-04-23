import { useQuery } from "@tanstack/react-query"
import { clientApi } from "../../api/api"

export const ClientPage = () => {
  const query = useQuery(['client'], () => clientApi.getAll())
  console.log(query.data)
  return <div>Client</div>
}