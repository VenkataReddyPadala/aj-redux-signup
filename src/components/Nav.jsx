import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar">
      <p>Header</p>
      <ul>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
