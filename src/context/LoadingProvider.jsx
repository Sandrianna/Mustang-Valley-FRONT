import { useContext, createContext, useReducer } from "react";

const initialState = {
  load: false,
};

const loadingReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { load: true };
    case "STOP_LOADING":
      return { load: false };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  const startLoading = () => {
    dispatch({ type: "START_LOADING" });
  };

  const stopLoading = () => {
    dispatch({ type: "STOP_LOADING" });
  };

  return (
    <LoadingContext.Provider
      value={{ loading: state.load, startLoading, stopLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
