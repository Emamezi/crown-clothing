import { useEffect } from "react";
import {
  onAuthStateChangeListner,
  createUserDocumentFromAuth,
  getUserInfo,
} from "./utils/firebase/firebase";
import Home from "./routes/home/home.component";
import { useDispatch } from "react-redux";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import { setCurrentUser, setDisplayName } from "./store/user/user.actions";

import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/check-out.component";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListner(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        const displayName = await getUserInfo(user.uid);
        dispatch(setDisplayName(displayName));
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    // seting up routing for top level components
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
