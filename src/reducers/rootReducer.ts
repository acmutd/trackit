import { combineReducers } from "redux";
import authenticateReducer from "./authentication";
import userReducer from "./user";

export interface RootReducer {
  loggedIn: boolean;
  workshopID: string;
  workshop_data: Record<string, unknown>;
}

const appState = combineReducers({
  authenticateReducer,
  userReducer,
});

export default appState;
