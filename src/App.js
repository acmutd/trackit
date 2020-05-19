import * as React from "react";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User/User";
import Pricing from "./Components/Pages/Pricing";
import Error404 from "./Components/Pages/Error404";
import { Route, Switch } from "react-router-dom";
import app from "./Components/Firebase/firebase";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" render = {(props) => <User database = {app} />} exact />
        <Route path="/admin" render = {(props) => <Admin database = {app} />} exact />
        <Route path="/pricing" component={Pricing} exact />
        <Route path="*" component={Error404} exact />
      </Switch>
    </div>
  );
}

export default App;
