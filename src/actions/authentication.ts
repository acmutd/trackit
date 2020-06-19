export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface authInterface {
  type: typeof LOGIN | typeof LOGOUT;
  payload?: string;
}

export const loginAction = (username: string): authInterface => {
  return {
    type: LOGIN,
    payload: username,
  };
};

export const logoutAction = (): authInterface => {
  return {
    type: LOGOUT,
  };
};
