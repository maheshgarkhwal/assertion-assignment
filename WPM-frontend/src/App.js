import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import PasswordManager from "./pages/PasswordManager/PasswordManager.jsx";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PasswordManager />
        </Route>
        <Route path="/passwordGenerator">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
