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
import AddIcon from "@mui/icons-material/Add";

import style from "./create.module.css";
import { IOrder } from "../../../pages/order/types";
import { OrderApi } from "../../../api/order-api";
import { ListOfProductsApi } from "../../../api/list-of-products-api";
import {
  IListOfProducts,
  IListOfProductsForm,
} from "../../../pages/list-of-products/types";
import { ProductApi } from "../../../api/product-api";
import { IProduct } from "../../../pages/product/types";

export const CreateButton = () => {
  type Anchor = "right";

  const cancelCourse = () => {
    (document.getElementById("form") as HTMLFormElement)?.reset();
  };

  const { refetch } = useQuery(["list-of-products"], () =>
    ListOfProductsApi.getAll<IListOfProducts[]>()
  );
  const { data: product } = useQuery(["product"], () =>
    ProductApi.getAll<IProduct[]>()
  );
  const { data: order } = useQuery(["order"], () =>
    OrderApi.getAll<IOrder[]>()
  );
  const { register, handleSubmit } = useForm<IListOfProductsForm>();

  const onSubmit = async (data: IListOfProductsForm) => {
    await ListOfProductsApi.create(data);
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
            <h2>Create List Of Products</h2>
            <hr />
          </div>
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className={style.form}
          >
            <FormControl fullWidth>
              <InputLabel>Address</InputLabel>
              {order && (
                <Select
                  label="Address"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idOrder", {
                    required: "Please enter currency",
                  })}
                >
                  {order.map((item) => (
                    <MenuItem key={item.idOrder} value={item.idOrder}>
                      {item.address}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Name Product</InputLabel>
              {product && (
                <Select
                  label="Name Product"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idProduct", {
                    required: "Please enter currency",
                  })}
                >
                  {product.map((item) => (
                    <MenuItem key={item.idProduct} value={item.idProduct}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <TextField
              id="outlined-basic"
              label={"Quantity"}
              {...register("quantity")}
              variant="outlined"
            />
            <div className={style.btn}>
              <div className={style.btns}>
                <Button
                  type="submit"
                  onClick={toggleDrawer(anchor, false)}
                  variant="contained"
                >
                  Create
                </Button>
                <div className={style.btn_reset}>
                  <Button onClick={cancelCourse} variant="outlined">
                    Reset
                  </Button>
                </div>
              </div>
              <div className={style.close_btn}>
                <Button variant="text" onClick={toggleDrawer(anchor, false)}>
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
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant="outlined">
            <AddIcon />
            Create a new List Of Products
          </Button>
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
