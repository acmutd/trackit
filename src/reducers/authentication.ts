import { LOGIN, LOGOUT, authInterface } from "../actions/authentication";

const authenticateReducer = (state = { loggedIn: false }, action: authInterface) => {
  console.log('auth reducer')
  console.log(state)
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
