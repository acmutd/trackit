import { combineReducers } from "redux";
import authenticateReducer from "./authentication";

export interface RootReducer {
  loggedIn: boolean;
  username: string;
}

const appState = combineReducers({
  authenticateReducer,
});

export default appState;