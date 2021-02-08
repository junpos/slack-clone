import { makeStyles } from "@material-ui/core/styles";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { auth } from "./firebase";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { defaultChannel } from "./constants";

import "./App.css";
import { useStateVlaue } from "./StateProvider";
import { useEffect } from "react";

const useStyles = makeStyles({
    app: {
        width: "100vw"
    },
    main: {
        display: "flex",
        height: "100vh"
    }
});

function App() {
    const classes = useStyles();
    const [{ user }] = useStateVlaue();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            authUser
                ? localStorage.setItem("authUser", JSON.stringify(authUser))
                : localStorage.removeItem("authUser");
        });
    }, []);

    return (
        <div className={classes.app}>
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <>
                        <Header />
                        <section className={classes.main}>
                            <Sidebar />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        return (
                                            <Redirect
                                                to={defaultChannel.route}
                                            />
                                        );
                                    }}
                                />
                                <Route path="/channel/:channelId">
                                    <Chat />
                                </Route>
                            </Switch>
                        </section>
                    </>
                )}
            </Router>
        </div>
    );
}

export default App;
