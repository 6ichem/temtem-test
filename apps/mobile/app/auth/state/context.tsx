import React, { createContext, useReducer, Dispatch } from "react";
import { reducer } from "./reducer";
import { AppContextType } from "./types";
import { initialState } from ".";

export const AuthContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
