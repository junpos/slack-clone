import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord, Cancel, AddCircle } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import SidebarOption from "./SidebarOption";
import db from "../firebase";
import { useStateVlaue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { defaultChannel } from "../constants";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        display: ({ isSidebarOpen }) => (isSidebarOpen ? "block" : "none"),
        position: ({ isSidebarOpen }) =>
            isSidebarOpen ? "absolute" : "relative",
        backgroundColor: "var(--slack-color)",
        color: "white",
        width: ({ isSidebarOpen }) => (isSidebarOpen ? 260 : "auto"),
        maxWidth: 260,
        zIndex: 2,
        height: "100vh",
        transition: "all 500ms ease-in-out",

        [theme.breakpoints.up("md")]: {
            flex: 0.25,
            display: "block !important",
            position: "relative",
            borderTop: "1px solid var(--border-color)"
        },

        "& hr": {
            marginTop: 10,
            marginBottom: 10,
            border: "1px solid var(--border-color)"
        }
    },

    sidebar__header: {
        display: "flex",
        borderBottom: "1px solid var(--border-color)",
        padding: 13,
        paddingBottom: 10
    },

    sidebar__info: {
        flex: 1,

        "& button": {
            [theme.breakpoints.up("md")]: {
                display: "none"
            }
        },

        "& > h3": {
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            fontWeight: 400,

            "& > svg": {
                fontSize: 16,
                color: "green",
                marginRight: 4
            }
        }
    },

    sidebar__button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& > h2": {
            margin: 0,
            fontSize: 20,
            fontWeight: 900,
            marginBottom: 5
        }
    },

    sidbar__edit: {
        padding: 8,
        color: "var(--border-color)",
        backgroundColor: "white",
        fontSize: 18,
        borderRadius: "50%"
    }
}));

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const { pathname } = useLocation();
    const [{ user, isSidebarOpen }, dispatch] = useStateVlaue();
    const classes = useStyles({ isSidebarOpen });

    const toggleSidebar = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.TOGGLE_SIDE_NAV
        });
    };

    const transformChannels = (acc, doc) => {
        if (doc.id !== defaultChannel.id) {
            acc.push({
                id: doc.id,
                name: doc.data().name
            });
        }
        return acc;
    };

    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) => {
            setChannels(snapshot.docs.reduce(transformChannels, []));
        });
    }, []);

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__header}>
                <div className={classes.sidebar__info}>
                    <section className={classes.sidebar__button}>
                        <h2>Slack Clone</h2>
                        {isSidebarOpen && (
                            <Button color="secondary" onClick={toggleSidebar}>
                                <Cancel />
                            </Button>
                        )}
                    </section>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </div>
            </div>

            <SidebarOption
                title="Add Channel"
                Icon={AddCircle}
                action="create"
                isActive={false}
            />
            <SidebarOption
                {...defaultChannel}
                isActive={pathname === `/channel/${defaultChannel.id}`}
            />

            {channels.map((channel) => (
                <SidebarOption
                    title={channel.name}
                    key={channel.id}
                    id={channel.id}
                    isActive={pathname === `/channel/${channel.id}`}
                />
            ))}
        </div>
    );
}

export default Sidebar;
