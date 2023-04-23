import * as React from 'react';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { IProductForm } from './types';
import { productApi } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../../pages/product/types';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import style from './drawer.module.css'



export const CreateButton = () => {
  
  type Anchor = 'right';
  

  const {refetch} = useQuery(['product'], () => productApi.getAll<IProduct[]>())
  const { register, handleSubmit } = useForm<IProductForm>();
  
  const onSubmit = async (data: IProductForm) => {
    await productApi.create(data)
    refetch()
  };



  const [state, setState] = React.useState({
    right: false,
  });
  
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
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
            <h2>Create Product</h2>
            <hr />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <TextField id="outlined-basic" label="Name" {...register('name')} variant="outlined" />
            <TextField id="outlined-basic" label="Price" {...register('price')} variant="outlined" />
            <div className={style.btn}>
              <div className={style.create_btn}>
                <Button type="submit" variant="outlined">Create</Button>
              </div>
              <div className={style.close_btn}>
                <Button variant="text" onClick={toggleDrawer(anchor, false)}>Back</Button>
              </div>
            </div>
          </form>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant="outlined">Create a new Product</Button>
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
}