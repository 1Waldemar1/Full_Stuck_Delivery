import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';
import style from './sidebar.module.css'


export const Sidebar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List className={style.root}>
          <Link to={'product'} className={style.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Product" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={'client'} className={style.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Client" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={'courier'} className={style.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Courier" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={'order'} className={style.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Order" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={'list-of-products'} className={style.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="List of products" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Box>
  );
}