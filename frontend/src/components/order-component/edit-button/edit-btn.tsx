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

  const { data, refetch } = useQuery(["order"], () =>
    OrderApi.getAll<IOrder[]>()
  );

  const { data: client } = useQuery(["client"], () =>
    ClientApi.getAll<IClient[]>()
  );

  const { data: courier } = useQuery(["courier"], () =>
    CourierApi.getAll<ICourier[]>()
  );

  const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IOrderForm>({
    mode: "onBlur",
  });

  const onEdit = async (data: IOrderEdit) => {
    let id = props.id;

    let order = {
      idClient: data.idClient,
      idCourier: data.idCourier,
      address: data.address,
      order_creation_date: data.order_creation_date,
    };

    await OrderApi.update(id, order);
    reset();
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

      setTimeout(() => {
        reset();
      }, 300);

      if (open && data && data.length > 0) {
        const order = data.find((p: IOrder) => p.idOrder === props.id);
        setSelectedOrder(order || null);
      } else {
        setSelectedOrder(null);
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box role="presentation">
      <List>
        <div>
          <div className={style.title}>
            <h2>Edit Order</h2>
            <hr />
          </div>
          <form onSubmit={handleSubmit(onEdit)} className={style.form}>
            <TextField
              id="outlined-basic"
              label="Address"
              {...register("address", {
                required: "The field must be filled in",
              })}
              value={selectedOrder?.address || ""}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.address && <p>{errors?.address.message || "Error!"}</p>}
            </span>
            <TextField
              id="outlined-basic"
              type="date"
              {...register("order_creation_date", {
                required: "The field must be filled in",
                pattern:
                  /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/,
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.order_creation_date && (
                <p>
                  {errors?.order_creation_date.message ||
                    "Enter the correct date"}
                </p>
              )}
            </span>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              {client && (
                <Select
                  label="client"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  inputProps={register("idClient", {
                    required: "The field must be filled in",
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
            <span className={style.error}>
              {errors?.idClient && (
                <p>{errors?.idClient.message || "Error!"}</p>
              )}
            </span>
            <FormControl fullWidth>
              <InputLabel>Courier</InputLabel>
              {courier && (
                <Select
                  label="Courier"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idCourier", {
                    required: "The field must be filled in",
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
            <span className={style.error}>
              {errors?.idCourier && (
                <p>{errors?.idCourier.message || "Error!"}</p>
              )}
            </span>
            <div className={style.btn}>
              <div className={style.create_btn}>
                <Button
                  type="submit"
                  onClick={toggleDrawer(anchor, false)}
                  disabled={!isValid}
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
