import "./categories.styles.scss";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";

function Shop() {
  return <h1>I am the Shop Page</h1>;
}

function App() {
  return (
    // seting up routing for top level components
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
