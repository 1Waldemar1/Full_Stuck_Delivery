import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { courierApi } from "../../../api/courier-api";
import { ICourier } from "../../../pages/courier/types";
import style from "./delete.module.css";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["courier"], () =>
    courierApi.getAll<ICourier[]>()
  );

  const onDelete = async () => {
    let id = props.id;

    await courierApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
