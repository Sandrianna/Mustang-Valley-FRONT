import { createContext, useContext, useReducer } from "react";

const initialState = {
  errorMessage: "",
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { errorMessage: "" };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const setErrorMessage = (message) => {
    dispatch({ type: "SET_ERROR", payload: message });
  };

  const clearErrorMessage = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessage: state.errorMessage,
        setErrorMessage,
        clearErrorMessage,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorMessage = () => useContext(ErrorContext);
