import {
  LOGIN,
  LOGOUT,
  authInterface,
} from "../actions/authentication";

const authenticateReducer = (
  state = { loggedIn: false, username: "" },
  action: authInterface
) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        username: action.payload,
      };
    case LOGOUT:
      return {
        loggedIn: false,
      };
    default:
        return state;
  }
};

export default authenticateReducer;
