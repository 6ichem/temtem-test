import { Dispatch } from "react";
import { AppAction, actionTypes } from "./actions";
import { initialState } from ".";

export type AppState = {
  user: object | null;
};

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};
