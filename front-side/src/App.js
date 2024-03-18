import "./App.css";
import User_Signup from "./components/User_Signup";
import User_crud_operation from "./components/User_crud_operation";
import User_login from "./components/User_login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={User_login} />
          <Route path="/signup" exact component={User_Signup} />
          <Route path="/contact" component={User_crud_operation} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
