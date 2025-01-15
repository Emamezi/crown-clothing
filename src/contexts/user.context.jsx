import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangeListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  name: "",
});

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, SetName] = useState("");
  //keep track or observer for the user sign in state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      // SetName(user.displayName?.split(" ").at(0));
    });
    return unsubscribe;
  }, []);
  // const value = { currentUser, setCurrentUser };
  // const displayName = currentUser.displayName ?? "";
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser, name }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
