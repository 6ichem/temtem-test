import { Dispatch } from "react";
import { AppAction, actionTypes } from "./actions";

export type AppState = {
  trendingContent: object | null;
  searchContent: object | null;
};

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};
