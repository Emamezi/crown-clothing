import { createContext, useEffect, useReducer, useState } from "react";
import {
  onAuthStateChangeListner,
  createUserDocumentFromAuth,
  getUserInfo,
} from "../utils/firebase/firebase";
import { createAction } from "../utils/reducer/reducer.utils";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  name: "",
});

const INITIAL_USER_STATE = {
  currentUser: null,
};
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      throw new Error(
        `Action type ${action.type} not recognized for useReducer`
      );
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);
  const { currentUser } = state;

  function setCurrentUser(user) {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }
  // const [currentUser, setCurrentUser] = useState(null);
  const [name, SetName] = useState("");
  //keep track or observer for the user sign in state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListner(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        console.log(user);
        const displayName = await getUserInfo(user.uid);
        SetName(displayName);
      }

      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser, name }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
