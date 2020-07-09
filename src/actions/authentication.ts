export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DB = "DATABASE"

export interface authInterface {
  type: typeof LOGIN | typeof LOGOUT | typeof DB;
  payload?: string;
  database?: any;
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

export const dbTokenAction = (database: any): authInterface => {
  return {
    type: DB,
    payload: database
  }
}
