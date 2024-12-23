import { Outlet, Link, NavLink } from "react-router-dom";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";
import "./navigation.styles.scss";
function Navigation() {
  return (
    <>
      <div className="navigation">
        <NavLink className="logo-container" to="/">
          <CrownSvg />
        </NavLink>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
          <Link className="nav-link" to="signout">
            SIGN OUT
          </Link>
          {/* <h1>I am the Navigation page</h1> */}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
