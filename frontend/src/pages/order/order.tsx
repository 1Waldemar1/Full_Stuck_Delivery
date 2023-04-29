import { useQuery } from "@tanstack/react-query";
import { OrderApi } from "../../api/order-api";
import { IOrder } from "./types";
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
import { CreateButton } from "../../components/order-component/create-button/create-btn";
import style from "./order.module.css";
import { DeleteBtn } from "../../components/order-component/delete-button/delete-btn";
import { EditBtn } from "../../components/order-component/edit-button/edit-btn";

export const OrderPage = () => {
  const { data } = useQuery(["order"], () => OrderApi.getAll<IOrder[]>());

  return (
    <Card sx={{ minWidth: 300 }} className={style.card}>
      <CardContent>
        <h2>Order</h2>
        <div className={style.drawer}>
          <CreateButton />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">№</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Sum</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Courier</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((order) => (
                  <TableRow
                    key={order.idOrder}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{order.idOrder}</TableCell>
                    <TableCell align="left">{order.address}</TableCell>
                    <TableCell align="left">
                      {new Date(order.order_creation_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">{order.sum}</TableCell>
                    <TableCell align="left">
                      {order.courier.full_name}
                    </TableCell>
                    <TableCell align="left">{order.client.full_name}</TableCell>
                    <TableCell align="right">
                      <div className={style.btns}>
                        <EditBtn id={order.idOrder} />
                        <DeleteBtn id={order.idOrder} />
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
