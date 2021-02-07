import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import {
    StarBorderOutlined,
    InfoOutlined,
    OpenInNew
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import db from "../firebase";
import { useStateVlaue } from "../StateProvider";
import { actionTypes } from "../reducer";
import Message from "./Message";
import ChatInput from "./ChatInput";

const useStyles = makeStyles((theme) => ({
    chat: {
        flex: 0.75,
        flexGrow: 1,
        overflowY: "scroll",
        paddingBottom: 150
    },

    chat__header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        border: "1px solid lightgray"
    },

    chat__headerLeft: {
        display: "flex",
        alignItems: "center",

        "& button": {
            [theme.breakpoints.up("md")]: {
                display: "none"
            }
        }
    },

    chat__headerRight: {
        "& > p": {
            display: "flex",
            alignItems: "center",
            fontSize: 14,

            "& > svg.MuiSvgIcon-root": {
                paddingRight: 5,
                fontSize: 16
            }
        }
    },

    chat__channelName: {
        display: "flex",
        alignItems: "center",
        textTransform: "lowercase",

        "& > svg.MuiSvgIcon-root": {
            marginLeft: 10,
            fontSize: 18
        }
    }
}));

function Chat() {
    const { channelId } = useParams();
    const [channelInfo, setChannelInfo] = useState({});
    const [channelMessages, setChannelMessages] = useState([]);
    const [{ isSidebarOpen }, dispatch] = useStateVlaue();
    const classes = useStyles();

    const toggleSidebar = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({
            type: actionTypes.TOGGLE_SIDE_NAV
        });
    };

    useEffect(() => {
        if (channelId) {
            db.collection("channels")
                .doc(channelId)
                .onSnapshot((snapshot) => {
                    setChannelInfo(snapshot.data());
                });

            db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setChannelMessages(snapshot.docs.map((doc) => doc.data()));
                });
        }
    }, [channelId]);

    return (
        <div
            className={classes.chat}
            onClick={isSidebarOpen ? toggleSidebar : () => {}}
        >
            <div className={classes.chat__header}>
                <div className={classes.chat__headerLeft}>
                    {!isSidebarOpen && (
                        <Button color="primary" onClick={toggleSidebar}>
                            <OpenInNew />
                        </Button>
                    )}
                    <h3 className={classes.chat__channelName}>
                        <strong>#{channelInfo?.name}</strong>
                        <StarBorderOutlined />
                    </h3>
                </div>
                <div className={classes.chat__headerRight}>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>
            <div className={classes.chat__messages}>
                {channelMessages.map((message) => (
                    <Message {...message} key={message.timestamp} />
                ))}
            </div>
            <ChatInput channelName={channelInfo?.name} channelId={channelId} />
        </div>
    );
}

export default Chat;
