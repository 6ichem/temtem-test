import { AppAction, actionTypes } from "./actions";
import { AppState } from "./types";

export const reducer = (state: AppState, action: AppAction): AppState => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
