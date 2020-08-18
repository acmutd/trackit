import { LOGIN, LOGOUT, authInterface } from "../actions/authentication";

const authenticateReducer = (state = { loggedIn: false }, action: authInterface) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
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
