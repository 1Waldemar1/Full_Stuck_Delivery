import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../api/product-api";
import { IProduct } from "./types";
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
import { CreateButton } from "../../components/product-component/create-button/create-btn";

import style from "./product.module.css";
import { EditBtn } from "../../components/product-component/edit-button/edit-btn";
import { DeleteBtn } from "../../components/product-component/delete-button/delete-btn";

export const ProductPage = () => {
  const { data } = useQuery(["product"], () => productApi.getAll<IProduct[]>());

  return (
    <Card sx={{ minWidth: 300 }} className={style.card}>
      <CardContent>
        <h2>Product</h2>
        <div className={style.drawer}>
          <CreateButton />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((product) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{product.idProduct}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell align="right">
                      <div className={style.btns}>
                        <EditBtn id={product.idProduct} />
                        <DeleteBtn id={product.idProduct} />
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
