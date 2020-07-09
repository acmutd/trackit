import {
  LOGIN,
  LOGOUT,
  DB,
  authInterface,
} from "../actions/authentication";

const authenticateReducer = (
  state = { loggedIn: false, username: "", database: null},
  action: any
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
    case DB:
      console.log('databse updated')
      return{
        ...state,
        database: action.payload
      }
    default:
        return state;
  }
};

export default authenticateReducer;
