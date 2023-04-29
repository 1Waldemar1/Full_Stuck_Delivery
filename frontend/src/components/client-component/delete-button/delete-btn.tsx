import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../../../api/client-api";
import { IClient } from "../../../pages/client/types";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./delete.module.css";

export const DeleteBtn = (props: any) => {
  const { refetch } = useQuery(["client"], () => clientApi.getAll<IClient[]>());

  const onDelete = async () => {
    let id = props.id;

    await clientApi.delete(id);
    refetch();
  };

  return (
    <div>
      <DeleteIcon className={style.delete_btn} onClick={() => onDelete()} />
    </div>
  );
};
