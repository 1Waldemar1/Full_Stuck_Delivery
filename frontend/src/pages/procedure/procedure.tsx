import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { CallProcedure } from "../../components/procedure/create-btn";

import style from "./procedure.module.css";

export const ProcedurePage = () => {
  return (
    <div>
      <Card sx={{ minWidth: 300, minHeight: 750 }} className={style.card}>
        <CardContent>
          <h2>Procedures</h2>
          <Card sx={{ maxWidth: 375 }} className={style.procedures}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Product
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                Increases price
              </Typography>
              <Typography variant="body2">
                increases the price by
                <br />
                {'"a specified percentage"'}
              </Typography>
            </CardContent>
            <CardActions>
              <div className={style.drawer}>
                <CallProcedure />
              </div>
            </CardActions>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
