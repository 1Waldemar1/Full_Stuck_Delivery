import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { CourierApi } from "../../../api/courier-api";
import { ICourier } from "../../../pages/courier/types";
import style from "./delete.module.css";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["courier"], () =>
    CourierApi.getAll<ICourier[]>()
  );

  const onDelete = async () => {
    let id = props.id;

    await CourierApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
