import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";
import { loginAction, logoutAction, authInterface } from "../actions/authentication";
import { connect, useSelector, useDispatch } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { Link, Redirect } from "react-router-dom";
import app from "../config/firebase";
import Loading from "../components/Layout/Loading";

console.log("hi from login");

const Login = ({ Component, destination, location }: any): JSX.Element => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: any) => state.authenticateReducer?.loggedIn);
  const { loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [user, setUser] = React.useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  function onAuthStateChange(callback: any) {
    return app.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginAction());
      } else {
        //dispatch(logoutAction());
      }
    });
  }

  console.log(location);

  const loginWrapper = () => {
    firebaseLogin();
    if (!user.loggedIn) return <Loading />;
    else return <Redirect to={location.state.destination || "/join"} />;
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

  console.log(
    isLoading ? "loading" : isAuthenticated ? (loginStatus ? "redirect" : "wrapper") : "login withh redirect"
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isAuthenticated ? (
        loginStatus ? (
          <Redirect to={location?.state?.destination || "/join"} />
        ) : (
          loginWrapper()
        )
      ) : (
        loginWithRedirect({ redirectUri: "http://localhost:3000/login" })
      )}
    </div>
  );
};

export default Login;
