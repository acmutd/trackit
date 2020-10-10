import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";
import { loginAction, logoutAction, authInterface } from "../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { Link, Redirect } from "react-router-dom";
import app from "../config/firebase";
import Loading from "../components/Layout/Loading";

console.log('hi from login')

const Login = (): JSX.Element => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return <div>{isLoading ? <Loading /> : isAuthenticated ? <Redirect to="/dashboard" /> : loginWithRedirect({redirectUri: 'http://localhost:3000/login'})}</div>;
};

export default Login;
 