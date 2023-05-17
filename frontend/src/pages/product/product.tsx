import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../api/product-api";
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
// import { useState } from "react";

export const ProductPage = () => {
  const { data } = useQuery(["product"], () => ProductApi.getAll<IProduct[]>());
  // const [page, setPage] = useState(1);
  // const limit = 4;

  // const { data, isPreviousData, refetch } = useQuery(
  //   ["product", page, limit],
  //   () => ProductApi.getPaginationAll<IProduct[]>(page, limit),
  //   { keepPreviousData: true }
  // );

  // const handlePrevPage = () => {
  //   if (page > 1) setPage(page - 1);
  //   refetch();
  // };

  // const handleNextPage = () => {
  //   setPage(page + 1);
  //   refetch();
  // };

  return (
    <div>
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
                  <TableCell align="left">№</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
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
                      <TableCell align="left">{product.idProduct}</TableCell>
                      <TableCell align="left">{product.name}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
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
        {/* <div className={style.pagination}>
          <button onClick={handlePrevPage} disabled={page < 2}>
            Prev
          </button>
          <span>Page {page}</span>
          <button onClick={handleNextPage} disabled={isPreviousData}>
            Next
          </button>
        </div> */}
      </Card>
    </div>
  );
};
