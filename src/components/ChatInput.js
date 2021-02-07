import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { useStateVlaue } from "../StateProvider";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
    chatInput: {
        position: "fixed",
        bottom: 0,
        padding: "15px 15px 20px 15px",
        borderTop: "1px solid lightcoral",
        backgroundColor: "white",

        "& > form": {
            width: "70vw",

            position: "relative",
            display: "flex",
            justifyContent: "center",

            [theme.breakpoints.up("md")]: {
                flexDirection: "row"
            },

            "& > input": {
                padding: "20px 5px",
                border: "1px solid gray",
                borderRadius: 5,
                flex: 0.8,

                [theme.breakpoints.up("md")]: {
                    flex: 1,
                    bottom: 30,
                    padding: 20
                }
            },

            "& > button": {
                flex: 0.1,
                marginLeft: 10
            }
        }
    }
}));

function ChatInput({ channelName, channelId }) {
    const classes = useStyles();
    const [input, setInput] = useState("");
    const [{ user }] = useStateVlaue();

    const messageChange = (e) => {
        setInput(e.target.value);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        setInput("");

        if (channelId && input) {
            db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL
                });
        }
    };

    return (
        <div className={classes.chatInput}>
            <form className={classes.chatInput__form}>
                <input
                    value={input}
                    placeholder={`Message in #${channelName?.toLowerCase()}`}
                    onChange={messageChange}
                />
                <Button
                    type="submit"
                    onClick={sendMessage}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    <SendIcon />
                </Button>
            </form>
        </div>
    );
}

ChatInput.prototype = {
    channelName: PropTypes.node,
    channelId: PropTypes.string
};

export default ChatInput;
