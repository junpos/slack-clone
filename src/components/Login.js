import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateVlaue } from "../StateProvider";
import { actionTypes } from "../reducer";

const useStyles = makeStyles({
    login: {
        padding: 30,
        height: "100vh",
        backgroundColor: "#f8f8f8",
        display: "grid",
        placeItems: "center"
    },

    login__container: {
        padding: 100,
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",

        "& > img": {
            width: 600,
            height: 140
        },

        "& > button": {
            marginTop: 50,
            textTransform: "inherit !important",
            backgroundColor: "#0a8d48 !important",
            color: "white"
        }
    }
});

function Login() {
    const classes = useStyles();
    const [_, dispatch] = useStateVlaue();

    const handleClick = () => {
        auth.signInWithPopup(provider)
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
                <img
                    src="https://a.slack-edge.com/80588/marketing/img/media-kit/img-logos.png"
                    alt="slack"
                />
                <h1>Sign in to Slack</h1>
                <Button onClick={handleClick}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;
