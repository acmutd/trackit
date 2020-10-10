import Loading from "../components/Layout/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { loginAction, logoutAction, authInterface } from "../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import app from "../config/firebase";
import * as React from "react";
import Admin from "./Admin";
import User from "./User";
import Pricing from "../views/Pricing";
import Error404 from "../views/Error404";
import { Route, Switch, BrowserRouter, Link, Redirect } from "react-router-dom";
import Login from "./Login";

function onAuthStateChange(callback: any) {
  return app.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true });
    } else {
      callback({ loggedIn: false });
    }
  });
}
console.log("hi from dashboard");

const Dashboard = (): JSX.Element => {
  const [user, setUser] = React.useState({ loggedIn: false });
  console.log("hi from dashboard");

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const loginWrapper = () => {
    firebaseLogin();
    if (!user.loggedIn) return <Loading />;
    else return <Redirect to="/join" />;
  };

  const firebaseLogin = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://harshasrikara.com/api`,
      scope: "read:current_user",
    });
    const response = await fetch(`https://us-central1-trackit-285205.cloudfunctions.net/api/getCustomToken`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    app.auth().signInWithCustomToken(data.firebaseToken);
  };

  return <div>{isLoading ? <Loading /> : !isAuthenticated ? <Redirect to="/" /> : loginWrapper()}</div>;
};

export default Dashboard;
