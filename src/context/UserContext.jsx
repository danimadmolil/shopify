import { createContext, useReducer } from "react";
import { getItemWithExpire } from "../utils/localStorage";

export const Context = createContext();
const actionTypes = {
  SET_USER: "SET_USER",
  CHECK_AUTH: "CHECK_AUTH",
  LOG_OUT: "LOG_OUT",
};

export default function UserContext({ children }) {
  const defaultState = {
    user: getItemWithExpire("user") || {},
    isAuthenticated: getItemWithExpire("isAuthenticated"),
    logout: function () {
      dispatch({ type: actionTypes.LOG_OUT });
    },
    setUser: function (payload) {
      dispatch({ type: "SET_USER", payload });
    },
  };
  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === actionTypes.SET_USER) {
      console.log("setUer", action);
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isAuthenticated: getItemWithExpire("isAuthenticated"),
      };
    }
    if (action.type === actionTypes.LOG_OUT) {
      return {
        ...state,
        user: {},
        isAuthenticated: getItemWithExpire("isAuthenticated"),
      };
    }
    return state; // defaut state
  }, defaultState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
