import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context";
type NavProps = {
  title: string;
};
export const Header = (props: NavProps) => {
  const auth = useAuth();
  const user = auth.user;

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container flex-column flex-md-row">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        {user && (
          <ul className="navbar-nav flex-row" id="nav-hidden">
            <li className="nav-item me-1">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-1">
              <NavLink to="/my_post" className="nav-link">
                My Blog
              </NavLink>
            </li>
            <li className="nav-item me-1">
              <NavLink to="/add_post" className="nav-link">
                Add Blog
              </NavLink>
            </li>
          </ul>
        )}
        <div>
          {!user && (
            <>
              <button
                className="btn btn-primary me-2"
                type="button"
                onClick={() => navigate("login")}
              >
                Sign In <i className="fa fa-sign-in" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-primary me-2"
                type="button"
                onClick={() => navigate("signup")}
              >
                Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
              </button>
            </>
          )}
          {user && (
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={() => {
                auth.logout();
                navigate("/");
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
