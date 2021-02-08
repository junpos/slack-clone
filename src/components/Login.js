import React from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateVlaue } from "../StateProvider";
import { actionTypes } from "../reducer";

import slackLogo from "../assets/images/slack-logo.png";

const useStyles = makeStyles((theme) => ({
    login: {
        height: "100vh",
        backgroundColor: "#f8f8f8",
        display: "grid",
        placeItems: "center",

        [theme.breakpoints.up("md")]: {
            padding: 30
        }
    },

    login__container: {
        padding: 30,
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",

        [theme.breakpoints.up("md")]: {
            padding: 100
        },

        "& > img": {
            minWidth: 125,
            minHeight: 125,
            maxWidth: 400,
            maxHeight: 400,
            width: "50%",
            height: "50%"
        },

        "& > button": {
            marginTop: 10,
            textTransform: "inherit !important",
            backgroundColor: "#0a8d48 !important",
            color: "white",

            [theme.breakpoints.up("md")]: {
                marginTop: 50
            }
        }
    }
}));

function Login() {
    const classes = useStyles();
    const [_, dispatch] = useStateVlaue();

    const handleClick = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return auth.signInWithPopup(provider);
            })
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className={classes.login}>
            <div className={classes.login__container}>
                <img src={slackLogo} alt="slack" />
                <h1>Sign in to Slack</h1>
                <Button onClick={handleClick}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;
