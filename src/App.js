import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";

import "./App.css";
import { useStateVlaue } from "./StateProvider";

const useStyles = makeStyles({
    main: {
        display: "flex",
        height: "100vh"
    }
});

function App() {
    const classes = useStyles();
    const [{ user }] = useStateVlaue();

    return (
        <div className="App">
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <>
                        <Header />
                        <section className={classes.main}>
                            <Sidebar />
                            <Switch>
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
