import { useQuery } from "@tanstack/react-query"
import { productApi } from "../../api/api"
import { IProduct } from "./types"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from "@mui/material"
import style from "./product.module.css"
import { CreateButton } from "../../components/drawer/drawer"



export const ProductPage = () => {
  const {data} = useQuery(['product'], () => productApi.getAll<IProduct[]>())

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
            </TableRow>
          </TableHead>
          <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.idProduct}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
  
  )
}