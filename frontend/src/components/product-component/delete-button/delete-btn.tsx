import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../../api/product-api";
import { IProduct } from "../../../pages/product/types";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./delete.module.css";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["product"], () =>
    productApi.getAll<IProduct[]>()
  );

  const onDelete = async () => {
    let id = props.id;

    await productApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
