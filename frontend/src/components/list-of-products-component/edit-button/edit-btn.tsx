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

  const { data, refetch } = useQuery(["list-of-products"], () =>
    ListOfProductsApi.getAll<IListOfProducts[]>()
  );

  const { data: product } = useQuery(["product"], () =>
    ProductApi.getAll<IProduct[]>()
  );

  const { data: order } = useQuery(["order"], () =>
    OrderApi.getAll<IOrder[]>()
  );

  const [selectedListOfProducts, setSelectedListOfProducts] =
    React.useState<IListOfProducts | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IListOfProductsForm>({
    mode: "onBlur",
  });

  const onEdit = async (data: IListOfProductsEdit) => {
    let id = props.id;

    let list_of_products = {
      idOrder: data.idOrder,
      idProduct: data.idProduct,
      quantity: data.quantity,
    };

    await ListOfProductsApi.update(id, list_of_products);
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
        const list = data.find(
          (p: IListOfProducts) => p.idList_of_products === props.id
        );
        setSelectedListOfProducts(list || null);
      } else {
        setSelectedListOfProducts(null);
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
                    required: "The field must be filled in",
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
            <span className={style.error}>
              {errors?.idOrder && <p>{errors?.idOrder.message || "Error!"}</p>}
            </span>
            <FormControl fullWidth>
              <InputLabel>Name Product</InputLabel>
              {product && (
                <Select
                  label="Name Product"
                  MenuProps={{ disableScrollLock: true }}
                  fullWidth
                  defaultValue=""
                  inputProps={register("idProduct", {
                    required: "The field must be filled in",
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
            <span className={style.error}>
              {errors?.idProduct && (
                <p>{errors?.idProduct.message || "Error!"}</p>
              )}
            </span>
            <TextField
              id="outlined-basic"
              label={"Quantity"}
              {...register("quantity", {
                required: "The field must be filled in",
                pattern: /^\d+$/,
              })}
              defaultValue={selectedListOfProducts?.quantity || ""}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.quantity && (
                <p>
                  {errors?.quantity.message ||
                    "The quantity must be a positive integer"}
                </p>
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
