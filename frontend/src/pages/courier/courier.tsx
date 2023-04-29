import { useQuery } from "@tanstack/react-query";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";
import { CourierApi } from "../../api/courier-api";
import { CreateButton } from "../../components/courier-component/create-button/create-btn";
import { DeleteBtn } from "../../components/courier-component/delete-button/delete-btn";
import { EditBtn } from "../../components/courier-component/edit-button/edit-btn";
import { ICourier } from "./types";
import style from "./courier.module.css";

export const CourierPage = () => {
  const { data } = useQuery(["courier"], () => CourierApi.getAll<ICourier[]>());

  return (
    <Card sx={{ minWidth: 300 }} className={style.card}>
      <CardContent>
        <h2>Courier</h2>
        <div className={style.drawer}>
          <CreateButton />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((courier) => (
                  <TableRow
                    key={courier.idCourier}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{courier.full_name}</TableCell>
                    <TableCell>{courier.phone}</TableCell>
                    <TableCell align="right">
                      <div className={style.btns}>
                        <EditBtn id={courier.idCourier} />
                        <DeleteBtn id={courier.idCourier} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
