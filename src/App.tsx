import * as React from "react";
import Admin from "./auth_views/Admin";
import User from "./auth_views/User";
import Pricing from "./views/Pricing";
import Error404 from "./views/Error404";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            render={(props) => <User />}
            exact
          />
          <Route
            path="/admin"
            render={(props) => <Admin />}
            exact
          />
          <Route path="/pricing" component={Pricing} exact />
          <Route path="*" component={Error404} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
