import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

import './App.css';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    height: '100vh',
  },
});

function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <Router>
        <Header />
        <section className={classes.main}>
          <Sidebar/>
          <Switch>
            <Route path="/channel/:channelId">
              <Chat />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
