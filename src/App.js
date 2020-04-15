import React from "react";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User/TODO";
import Pricing from "./Components/Pages/Pricing";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      {/* replace this with <User /> when wanting to test out the user side, we can decide at a later point when the admin side should appear and when the user side should apper */}
      <Switch>
        <Route path="/" component={User} exact />
        <Route path="/admin" component={Admin} />
        <Route path="/pricing" component={Pricing} />
        {/* <Route component={Error} /> enable this once there is a 404 page*/}
      </Switch>
    </div>
  );
}

export default App;
