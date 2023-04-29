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
    (document.getElementById("form") as HTMLFormElement)?.reset();
  };

  const { refetch } = useQuery(["product"], () =>
    ProductApi.getAll<IProduct[]>()
  );
  const { register, handleSubmit } = useForm<IProductForm>();

  const onSubmit = async (data: IProductForm) => {
    await ProductApi.create(data);
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
              {...register("name")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Price"
              {...register("price")}
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
