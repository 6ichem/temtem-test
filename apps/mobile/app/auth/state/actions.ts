export const actionTypes = {
  SET_USER: "SET_USER",
};

export type AppAction = {
  type: keyof typeof actionTypes;
  payload: any;
};
