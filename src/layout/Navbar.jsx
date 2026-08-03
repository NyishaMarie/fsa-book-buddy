import { useAuth } from "../auth/AuthContext";
import {NavLink} from "react-router"

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Book Buddy</p>
      <nav>
        <NavLink to="/books">Books</NavLink>

        {token && (
          <>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/" onClick={() => logout()}>Logout</NavLink>
          </>
        )}

        {!token && <NavLink to="/login">Login</NavLink>}
        {!token && <NavLink to="/register">Register</NavLink>}
      </nav>
    </header>
  );
}
