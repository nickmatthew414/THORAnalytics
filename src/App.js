
import Network from './components/network/network';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter  as Router } from 'react-router-dom';
import LiquidityPools from './components/liquidityPools/liquidityPools';
import Rune from './components/rune/rune';

function App() {


  return (
      <Router>
        <Switch>
        <Route exact path="/">
          <Network />
        </Route>
        <Route path="/liquidityPools">
          <LiquidityPools />
        </Route>
        <Route path="/rune">
          <Rune />
        </Route>
        </Switch> 
      </Router>
      );
}

export default App;
