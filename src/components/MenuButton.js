import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import { auth } from "../firebase";
import { useStateVlaue } from "../StateProvider";

const useStyles = makeStyles((theme) => ({
    menu: {}
}));

function MenuButton() {
    const classes = useStyles();
    const [{ user }] = useStateVlaue();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef();

    const handleClick = () => {
        setIsOpen((o) => !o);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            window.location.href = "/";
        });
    };

    return (
        <div className={classes.menu}>
            <Button
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar alt={user?.displayName} src={user?.photoURL} />
            </Button>
            <span ref={buttonRef} />
            <Menu
                id="simple-menu"
                anchorEl={buttonRef.current}
                keepMounted
                open={isOpen}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuButton;
