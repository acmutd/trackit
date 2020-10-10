import * as React from "react";
import Admin from "./auth_views/Admin";
import User from "./auth_views/User";
import Pricing from "./views/Pricing";
import Error404 from "./views/Error404";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./auth_views/Login";
import Dashboard from "./auth_views/Dashboard";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/join"
            render={(props) => <User />}
            exact
          />
          <Route
            path="/admin"
            render={(props) => <Admin />}
            exact
          />
          <Route path="/" component={LandingPage} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/pricing" component={Pricing} exact />
          <Route path="*" component={Error404} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
