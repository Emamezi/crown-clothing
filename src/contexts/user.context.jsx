import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangeListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  //keep track or observer for the user sign in state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListner((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  // const value = { currentUser, setCurrentUser };
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
