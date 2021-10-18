import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PasswordGenerator from "./pages/PasswordGenerator/PasswordGenerator.jsx";
import PasswordManager from "./pages/PasswordManager/PasswordManager.jsx";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PasswordManager />
        </Route>
        <Route path="/passwordGenerator">
          <PasswordGenerator />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
