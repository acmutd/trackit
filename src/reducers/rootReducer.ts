import { combineReducers } from "redux";
import authenticateReducer from "./authentication";
import userReducer from "./user"

export interface RootReducer {
  loggedIn: boolean;
  username: string;
}

const appState = combineReducers({
  authenticateReducer, userReducer
});

export default appState;