import * as React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";

import style from "./edit.module.css";
import { CourierApi } from "../../../api/courier-api";
import {
  ICourier,
  ICourierEdit,
  ICourierForm,
} from "../../../pages/courier/types";

export const EditBtn = (props: any) => {
  type Anchor = "right";

  const { refetch } = useQuery(["courier"], () =>
    CourierApi.getAll<ICourier[]>()
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICourierForm>({
    mode: "onBlur",
  });

  const onEdit = async (data: ICourierEdit) => {
    let id = props.id;

    let courier = {
      full_name: data.full_name,
      phone: data.phone,
    };

    await CourierApi.update(id, courier);
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
            <h2>Edit Courier</h2>
            <hr />
          </div>
          <form onSubmit={handleSubmit(onEdit)} className={style.form}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              {...register("full_name", {
                required: "The field must be filled in",
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.full_name && (
                <p>{errors?.full_name.message || "Error!"}</p>
              )}
            </span>
            <TextField
              id="outlined-basic"
              label="Phone"
              type="tel"
              {...register("phone", {
                required: "The field must be filled in",
                pattern: /^\+7\d{3}\d{3}\d{2}\d{2}$/,
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.phone && (
                <p>
                  {errors?.phone.message ||
                    "Phone must be in the format: +7 (XXX) XXX-XX-XX"}
                </p>
              )}
            </span>
            <div className={style.btn}>
              <div className={style.create_btn}>
                <Button
                  type="submit"
                  onClick={toggleDrawer(anchor, false)}
                  disabled={!isValid}
                  variant="contained"
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
