import { useQuery } from "@tanstack/react-query";
import { ListOfProductsApi } from "../../../api/list-of-products-api";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./delete.module.css";
import { IListOfProducts } from "../../../pages/list-of-products/types";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["list-of-products"], () =>
    ListOfProductsApi.getAll<IListOfProducts[]>()
  );

  const onDelete = async () => {
    let id = props.id;

    await ListOfProductsApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
