import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";

import style from "./edit.module.css";
import { OrderApi } from "../../../api//order-api";
import { ClientApi } from "../../../api/client-api";
import { CourierApi } from "../../../api/courier-api";
import { IClient } from "../../../pages/client/types";
import { ICourier } from "../../../pages/courier/types";
import { IOrder, IOrderEdit, IOrderForm } from "../../../pages/order/types";

export const EditBtn = (props: any) => {
  type Anchor = "right";

  const { refetch } = useQuery(["order"], () => OrderApi.getAll<IOrder[]>());
  const { data: client } = useQuery(["client"], () =>
    ClientApi.getAll<IClient[]>()
  );
  const { data: courier } = useQuery(["courier"], () =>
    CourierApi.getAll<ICourier[]>()
  );
  const { register, handleSubmit } = useForm<IOrderForm>();

  const cancelCourse = () => {
    (document.getElementById("form") as HTMLFormElement)?.reset();
  };

  const onEdit = async (data: IOrderEdit) => {
    let id = props.id;

    let order = {
      idClient: data.idClient,
      idCourier: data.idCourier,
      address: data.address,
      order_creation_date: data.order_creation_date,
    };

    await OrderApi.update(id, order);
    refetch();
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (!open) {
        cancelCourse();
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box role="presentation">
      <List>
        <div>
          <div className={style.title}>
            <h2>Edit Product</h2>
            <hr />
          </div>
          <form onSubmit={handleSubmit(onEdit)} className={style.form}>
            <TextField
              id="outlined-basic"
              label="Address"
              {...register("address")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              type="date"
              {...register("order_creation_date")}
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              {client && (
                <Select
                  label="client"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idClient", {
                    required: "Please enter currency",
                  })}
                >
                  {client.map((item) => (
                    <MenuItem key={item.idClient} value={item.idClient}>
                      {item.full_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Courier</InputLabel>
              {courier && (
                <Select
                  label="Courier"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idCourier", {
                    required: "Please enter currency",
                  })}
                >
                  {courier.map((item) => (
                    <MenuItem key={item.idCourier} value={item.idCourier}>
                      {item.full_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <div className={style.btn}>
              <div className={style.create_btn}>
                <Button
                  type="submit"
                  onClick={toggleDrawer(anchor, false)}
                  variant="outlined"
                >
                  Edit
                </Button>
              </div>
              <div className={style.close_btn}>
                <Button
                  variant="text"
                  id="button"
                  onClick={toggleDrawer(anchor, false)}
                >
                  Back
                </Button>
              </div>
            </div>
          </form>
        </div>
      </List>
    </Box>
  );

  return (
    <div className={style.btns}>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <EditIcon
            onClick={toggleDrawer(anchor, true)}
            className={style.edit_btn}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
