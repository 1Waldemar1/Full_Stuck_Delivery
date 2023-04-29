import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./delete.module.css";
import { OrderApi } from "../../../api/order-api";
import { IOrder } from "../../../pages/order/types";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["order"], () => OrderApi.getAll<IOrder[]>());

  const onDelete = async () => {
    let id = props.id;

    await OrderApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
