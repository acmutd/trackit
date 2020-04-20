import React from "react";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User/User";
import Pricing from "./Components/Pages/Pricing";
import Error404 from "./Components/Pages/Error404";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC10N5kRDieKncmUESxswqkYQ_359f9Qes",
  authDomain: "trackit-271619.firebaseapp.com",
  databaseURL: "https://trackit-271619.firebaseio.com",
  projectId: "trackit-271619",
  storageBucket: "trackit-271619.appspot.com",
  messagingSenderId: "972365141905",
  appId: "1:972365141905:web:fbda064275f635298cec30",
  measurementId: "G-HRLPFBGB1E",
};

let app = firebase.initializeApp(firebaseConfig);
let db = app.firestore();

function App() {
  return (
    <div>
      {/* replace this with <User /> when wanting to test out the user side, we can decide at a later point when the admin side should appear and when the user side should apper */}
      <Switch>
        <Route path="/" render={(props) => <User database={db} />} exact />
        <Route
          path="/admin"
          render={(props) => <Admin database={db} />}
          exact
        />
        <Route path="/pricing" component={Pricing} exact />
        <Route path="*" component={Error404} exact />
      </Switch>
    </div>
  );
}

export default App;
