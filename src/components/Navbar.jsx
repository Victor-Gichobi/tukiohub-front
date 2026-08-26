import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  return (
    <header className="nav">
      <Link className="brand" to="/">
        TUKIOHUB
      </Link>

      <nav>
        <NavLink to="/events">Events</NavLink>

        {user && (
          <NavLink to="/registrations">
            My Registrations
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin">
            Admin
          </NavLink>
        )}

        {user ? (
          <button
            className="link-button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link className="login-link" to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;