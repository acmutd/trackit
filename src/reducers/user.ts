import { WORKSHOP, WORKSHOP_DATA, userInterface } from "../actions/user";

const userReducer = (state = { workshopID: "", workshop_data: {} }, action: userInterface) => {
  switch (action.type) {
    case WORKSHOP:
      return {
        ...state,
        workshopID: action.payload,
      };
    case WORKSHOP_DATA:
      return {
        ...state,
        workshop_data: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
