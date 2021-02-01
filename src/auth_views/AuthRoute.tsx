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



const AuthRoute = ({Component, path, ...props}: any) => {
  const loginStatus = useSelector((state: any) => state.authenticateReducer?.loggedIn);
  console.log(loginStatus)
  return (
    <Route
      render={(props) =>
        loginStatus === false ? <Redirect to={{ pathname: "/login", state: { destination: path } }} /> : <Component />
      }
    ></Route>
  );
};

export default AuthRoute;
