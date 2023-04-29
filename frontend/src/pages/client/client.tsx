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
import { ClientApi } from "../../api/client-api";
import { CreateButton } from "../../components/client-component/create-button/create-btn";
import { DeleteBtn } from "../../components/client-component/delete-button/delete-btn";
import { EditBtn } from "../../components/client-component/edit-button/edit-btn";
import { IClient } from "./types";
import style from "./client.module.css";

export const ClientPage = () => {
  const { data } = useQuery(["client"], () => ClientApi.getAll<IClient[]>());

  return (
    <Card sx={{ minWidth: 300 }} className={style.card}>
      <CardContent>
        <h2>Client</h2>
        <div className={style.drawer}>
          <CreateButton />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((client) => (
                  <TableRow
                    key={client.idClient}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{client.full_name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell align="right">
                      <div className={style.btns}>
                        <EditBtn id={client.idClient} />
                        <DeleteBtn id={client.idClient} />
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
