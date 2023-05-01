import * as React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProductApi } from "../../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import {
  IProduct,
  IProductEdit,
  IProductForm,
} from "../../../pages/product/types";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";

import style from "./edit.module.css";

export const EditBtn = (props: any) => {
  type Anchor = "right";

  const { refetch } = useQuery(["product"], () =>
    ProductApi.getAll<IProduct[]>()
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IProductForm>({
    mode: "onBlur",
  });

  const onEdit = async (data: IProductEdit) => {
    let id = props.id;

    let product = {
      name: data.name,
      price: data.price,
    };

    await ProductApi.update(id, product);
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
      }, 1000);
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
              label="Name"
              {...register("name", {
                required: "The field must be filled in",
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.name && <p>{errors?.name.message || "Error!"}</p>}
            </span>
            <TextField
              id="outlined-basic"
              label="Price"
              {...register("price", {
                required: "The field must be filled in",
                pattern: /^\d+(\.\d+)?$/,
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.price && (
                <p>
                  {errors?.price.message ||
                    "The price must be a positive number"}
                </p>
              )}
            </span>
            <div className={style.btn}>
              <div className={style.create_btn}>
                <Button
                  type="submit"
                  disabled={!isValid}
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
