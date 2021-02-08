import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Search, HelpOutline } from "@material-ui/icons";
import MenuButton from "./MenuButton";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px 0px",
        backgroundColor: "var(--slack-color)",
        color: "white"
    },

    header__left: {
        flex: 0.4,
        flexGrow: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
            flex: 0.3,
            paddingLeft: 20,
            justifyContent: "flex-start"
        }
    },

    header__search: {
        flex: 0.4,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        padding: "0px 25px",
        backgroundColor: "var(--search-bg-color)",
        color: "grey",
        border: "1px grey solid",
        borderRadius: 6,

        [theme.breakpoints.up("md")]: {
            padding: "0px 50px"
        },

        "& > input": {
            backgroundColor: "transparent",
            border: "none",
            textAlign: "center",
            minWidth: "30vw",
            padding: 5
        }
    },

    header__right: {
        flex: 0.2,
        flexGrow: 0,
        display: "flex",
        justifyContent: "center",
        paddingRight: 10,
        [theme.breakpoints.up("md")]: {
            flex: 0.3,
            paddingRight: 20,
            justifyContent: "flex-end"
        }
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.header__left}>
                <MenuButton />
            </div>

            <div className={classes.header__search}>
                <Search />
                <input placeholder="Search Channel Name" />
            </div>

            <div className={classes.header__right}>
                <HelpOutline />
            </div>
        </div>
    );
}

export default Header;
