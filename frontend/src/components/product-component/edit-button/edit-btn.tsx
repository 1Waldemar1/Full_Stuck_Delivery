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

  const { register, handleSubmit } = useForm<IProductForm>();

  const onEdit = async (data: IProductEdit) => {
    let id = props.id;

    let product = {
      name: data.name,
      price: data.price,
    };

    await ProductApi.update(id, product);
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
