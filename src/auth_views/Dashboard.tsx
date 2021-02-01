import Loading from "../components/Layout/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { loginAction, logoutAction, authInterface, LOGIN } from "../actions/authentication";
import { connect, useDispatch, useSelector } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import app from "../config/firebase";
import * as React from "react";
import Admin from "./Admin";
import User from "./User";
import Pricing from "../views/Pricing";
import Error404 from "../views/Error404";
import { Route, Switch, BrowserRouter, Link, Redirect } from "react-router-dom";
import Login from "./Login";

console.log("hi from dashboard33333");

const Dashboard = (props: any): JSX.Element => {
  const [user, setUser] = React.useState({ loggedIn: false });
  console.log("hi from dashboard2222");

  const dispatch = useDispatch();
  const loginStatus = useSelector((state: any) => state.authenticateReducer?.loggedIn);

  function onAuthStateChange(callback: any) {
    return app.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginAction());
      } else {
        //dispatch(logoutAction());
      }
    });
  }

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
    else return <Redirect to={props.location.state.destination} />;
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

  console.log(props.location.state);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isAuthenticated && loginStatus ? (
        <Redirect to={props.location.state.destination} />
      ) : (
        loginWrapper()
      )}
    </div>
  );
};

export default Dashboard;
