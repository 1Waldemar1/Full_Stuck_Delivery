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
import { IOrder } from "../../../pages/order/types";
import { ListOfProductsApi } from "../../../api/list-of-products-api";
import {
  IListOfProducts,
  IListOfProductsEdit,
  IListOfProductsForm,
} from "../../../pages/list-of-products/types";
import { ProductApi } from "../../../api/product-api";
import { IProduct } from "../../../pages/product/types";

export const EditBtn = (props: any) => {
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

  const onEdit = async (data: IListOfProductsEdit) => {
    let id = props.id;

    let list_of_products = {
      idOrder: data.idOrder,
      idProduct: data.idProduct,
      quantity: data.quantity,
    };

    await ListOfProductsApi.update(id, list_of_products);
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
            <h2>Edit List Of Products</h2>
            <hr />
          </div>
          <form
            id="form"
            onSubmit={handleSubmit(onEdit)}
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
