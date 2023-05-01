import * as React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IProduct, IProductForm } from "../../../pages/product/types";
import { ProductApi } from "../../../api/product-api";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";

import style from "./create.module.css";

export const CreateButton = () => {
  type Anchor = "right";

  const cancelCourse = () => {
    reset();
  };

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

  const onSubmit = async (data: IProductForm) => {
    await ProductApi.create(data);
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
        if (!open) {
          cancelCourse();
        }
      }, 1000);
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box role="presentation">
      <List>
        <div>
          <div className={style.title}>
            <h2>Create Product</h2>
            <hr />
          </div>
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className={style.form}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
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
              <div className={style.btns}>
                <Button
                  type="submit"
                  onClick={toggleDrawer(anchor, false)}
                  disabled={!isValid}
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
            Create a new Product
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
