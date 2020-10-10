import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";
import { loginAction, logoutAction, authInterface } from "../actions/authentication";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { Link, Redirect } from "react-router-dom";
import app from "../config/firebase";
import Loading from "../components/Layout/Loading";

const Login = (): JSX.Element => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  
    /**
     * Imitates lifecycle method, method only gets called when the value of isAuthenticated changes
     */
    // const { getAccessTokenSilently, user, logout } = useAuth0();

    // const accessToken = await getAccessTokenSilently({
    //   audience: `https://harshasrikara.com/api`,
    //   scope: "read:current_user",
    // });
    // const response = await fetch(`http://localhost:5001/trackit-285205/us-central1/api/getCustomToken`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // useEffect(
    //   function () {
    //     if (!isLoading && isAuthenticated) {
    //       console.log("authentication in progress");
    //     }
    //   },
    //   [isAuthenticated, isLoading]
    // );
  
    // if (isLoading) {
    //   return (
    //     <div>
    //       <Loading />
    //     </div>
    //   );
    // }
    console.log(isAuthenticated)
    console.log(isLoading ? <Loading /> : isAuthenticated ? <Link to="/dashboard" /> : 'login with redirect')

  return <div>{isLoading ? <Loading /> : isAuthenticated ? <Redirect to="/dashboard" /> : loginWithRedirect()}</div>;
};

export default Login;