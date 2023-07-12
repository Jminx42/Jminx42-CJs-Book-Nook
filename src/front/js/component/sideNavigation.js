import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export const SideNavigation = () => {

    const { store, actions } = useContext(Context);
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 170 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="fas fa-search custom-text"></i>
                        </ListItemIcon>
                        <ListItemText className="custom-text" >
                            Search
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                {[
                    { text: 'Explore', icon: <i className="bi bi-book-fill custom-text"></i>, link: '/explore' },
                    { text: 'Cart', icon: <i className="fas fa-shopping-cart custom-text"></i>, link: '/cart' },
                    { text: 'Wishlist', icon: <i className="fa-solid fa-heart custom-text"></i>, link: '/wishlist' },
                    { text: 'Profile', icon: <i className="fa-solid fa-user custom-text"></i>, link: '/profile' },
                ].map((item) => (
                    <ListItem key={item.text} disablePadding className="d-flex">
                        <Link to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className="custom-text" />
                        </Link>
                    </ListItem>

                ))}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <i className="fa-solid fa-right-from-bracket custom-text"></i>
                        </ListItemIcon>
                        <ListItemText className="custom-text" >
                            Logout user
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><i className="fa-solid fa-bars"></i></Button>
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
