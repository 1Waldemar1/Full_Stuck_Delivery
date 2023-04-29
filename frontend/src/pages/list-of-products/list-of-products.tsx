import { useQuery } from "@tanstack/react-query";
import { ListOfProductsApi } from "../../api/list-of-products-api";
import { IListOfProducts } from "./types";
import {
  Card,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CreateButton } from "../../components/list-of-products-component/create-button/create-btn";
import { DeleteBtn } from "../../components/list-of-products-component/delete-button/delete-btn";
import { EditBtn } from "../../components/list-of-products-component/edit-button/edit-btn";
import style from "./list-of-products.module.css";

export const ListOfProductsPage = () => {
  const { data } = useQuery(["list-of-products"], () =>
    ListOfProductsApi.getAll<IListOfProducts[]>()
  );

  return (
    <Card sx={{ minWidth: 300 }} className={style.card}>
      <CardContent>
        <h2>List Of Products</h2>
        <div className={style.drawer}>
          <CreateButton />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">№</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Name Product</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((list_of_products) => (
                  <TableRow
                    key={list_of_products.idList_of_products}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {list_of_products.idList_of_products}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(
                        list_of_products.order.order_creation_date
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">
                      {list_of_products.order.address}
                    </TableCell>
                    <TableCell align="left">
                      {list_of_products.product.name}
                    </TableCell>
                    <TableCell align="left">
                      {list_of_products.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <div className={style.btns}>
                        <EditBtn id={list_of_products.idList_of_products} />
                        <DeleteBtn id={list_of_products.idList_of_products} />
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
