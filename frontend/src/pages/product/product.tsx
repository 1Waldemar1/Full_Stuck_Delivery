import { useQuery } from "@tanstack/react-query"
import { productApi } from "../../api/api"
import { IProduct } from "./types"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from "@mui/material"
import { CreateButton } from "../../components/drawer/drawer"
import DeleteIcon from '@mui/icons-material/Delete';

import style from "./product.module.css"



export const ProductPage = () => {
  const {data, refetch} = useQuery(['product'], () => productApi.getAll<IProduct[]>())

  const onDelete = async (id: string) => {
    await productApi.delete(id)
    refetch()
  }

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
          {data && data.map((product) => (
            <TableRow key={product.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{product.idProduct}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell align="right" onClick={() => onDelete(product.idProduct)}><DeleteIcon /></TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
  )
}