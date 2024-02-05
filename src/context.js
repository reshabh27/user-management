import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  loggedUser: null,
  canEdit: false,
  canDelete: false
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      const { role } = action.payload;

      // Set canEdit and canDelete based on the user's role
      let canEdit = false;
      let canDelete = false;

      if (role === "admin") {
        canEdit = true;
        canDelete = true;
      } else if (role === "editor") {
        canEdit = true;
        canDelete = false;
      }
      return {
        ...state,
        loggedUser: action.payload,
        canEdit,
        canDelete,
      };
    // ... other cases
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, initialState);


  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
