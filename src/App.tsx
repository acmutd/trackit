import * as React from "react";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User/User";
import Pricing from "./Components/Pages/Pricing";
import Error404 from "./Components/Pages/Error404";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import app from "./Components/Firebase/firebase";
import LandingPage from "./Components/Pages/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route
            path="/user"
            render={(props) => <User database={app} />}
            exact
          />
          <Route
            path="/admin"
            render={(props) => <Admin database={app} />}
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
