import { combineReducers } from "redux";

import {
  loginAction,
  authInterface,
  logoutAction,
} from "../actions/authentication";
import authenticateReducer from "./authentication";

interface RootReducer {
  loggedIn: boolean;
  username: string;
}

export default appState;