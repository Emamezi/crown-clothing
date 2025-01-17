import { createContext, useEffect, useReducer, useState } from "react";
import {
  onAuthStateChangeListner,
  createUserDocumentFromAuth,
  getUserInfo,
  auth,
} from "../utils/firebase/firebase";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  name: "",
});

const INITIAL_USER_STATE = {
  currentUser: null,
};
//creating default action types using object to keep track easily in application and avoid errors
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
    dispatch({
      type: USER_ACTION_TYPES.SET_CURRENT_USER,
      payload: user,
    });
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
      // SetName(() => getInfo);
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   async function getInfo() {
  //     const detail = await getUserInfo(auth.currentUser.uid);
  //     console.log(detail);
  //   }
  //   const { displayName } = getInfo();
  //   SetName(displayName);
  // }, []);
  // async function getInfo() {
  //   const user = await getUserInfo();
  //   console.log(user);
  // }
  // const value = { currentUser, setCurrentUser };
  // const displayName = currentUser.displayName ?? "";
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser, name }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
