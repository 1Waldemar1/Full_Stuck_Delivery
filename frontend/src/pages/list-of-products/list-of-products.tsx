import { useQuery } from "@tanstack/react-query"
import { ListOfProductsApi } from "../../api/api"


export const ListOfProductsPage = () => {
  const query = useQuery(['list-of-products'], () => ListOfProductsApi.getAll())
  console.log(query.data)
  return <div>List of products</div>
}