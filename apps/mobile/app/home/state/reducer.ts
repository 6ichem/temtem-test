import { AppAction, actionTypes } from "./actions";
import { AppState } from "./types";

export const reducer = (state: AppState, action: AppAction): AppState => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_TRENDING_CONTENT:
      return {
        ...state,
        trendingContent: payload,
      };
    case actionTypes.SET_SEARCH_CONTENT:
      return {
        ...state,
        searchContent: payload,
      };
    default:
      return state;
  }
};
