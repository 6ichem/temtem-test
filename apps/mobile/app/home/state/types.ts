import { Dispatch } from "react";
import { AppAction, actionTypes } from "./actions";

export type AppState = {
  trendingContent: any[] | null;
  searchContent: object | null;
  airingContent: any[] | null;
  upcomingContent: any[] | null;
};

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};
