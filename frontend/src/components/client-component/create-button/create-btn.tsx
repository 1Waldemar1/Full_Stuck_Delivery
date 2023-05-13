import * as React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IClient, IClientForm } from "../../../pages/client/types";
import { ClientApi } from "../../../api/client-api";
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

  const { refetch } = useQuery(["client"], () => ClientApi.getAll<IClient[]>());

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IClientForm>({
    mode: "onBlur",
  });

  const onSubmit = async (data: IClientForm) => {
    await ClientApi.create(data);
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
      }, 300);
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box role="presentation">
      <List>
        <div>
          <div className={style.title}>
            <h2>Create Client</h2>
            <hr />
          </div>
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className={style.form}
          >
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
            <TextField
              id="outlined-basic"
              label="Address"
              {...register("address", {
                required: "The field must be filled in",
              })}
              variant="outlined"
            />
            <span className={style.error}>
              {errors?.address && <p>{errors?.address.message || "Error!"}</p>}
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
            Create a new client
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
