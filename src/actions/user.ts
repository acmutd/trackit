export const WORKSHOP = "WORKSHOP";
export const WORKSHOP_DATA = "WORKSHOP_DATA";

export interface userInterface {
  type: typeof WORKSHOP | typeof WORKSHOP_DATA;
  payload?: string;
}

export const workshopAuthenticationAction = (workshopID: any): userInterface => {
  return {
    type: WORKSHOP,
    payload: workshopID,
  };
};

export const workshopDataAction = (workshop_data: any): userInterface => {
  return {
    type: WORKSHOP_DATA,
    payload: workshop_data
  };
};
