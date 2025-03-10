import { createContext, useContext, useReducer } from "react";

const initialState = {
  open: false,
  message: "",
};

const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return { open: true, message: action.payload };
    case "CLOSE_SNACKBAR":
      return { open: false, message: "" };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const showSnackbar = (message) => {
    dispatch({ type: "OPEN_SNACKBAR", payload: message });
  };

  const closeSnackbar = () => {
    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarMessage: state.message,
        openSnackbar: state.open,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
