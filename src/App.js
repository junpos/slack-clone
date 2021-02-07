import { makeStyles } from '@material-ui/core/styles';

// Components
import Header from './components/Header'
import Sidebar from './components/Sidebar'

import './App.css';

const useStyles = makeStyles({
  main: {
 
  },
});

function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <Header />
      <section className={classes.main}>
        <Sidebar/>
      </section>
    </div>
  );
}

export default App;
