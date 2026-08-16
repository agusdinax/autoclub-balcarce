import { NavLink } from "react-router-dom";
import "./Header.scss";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" },
  { label: "Clubs", path: "/clubs" },
  { label: "About", path: "/about" },
];

export function Header() {
  return (
    <header className="header">
      <div className="header__container">

        <NavLink to="/" className="header__logo">
          <span className="header__logo-mark">A</span>
          <span className="header__logo-text">AUTOCLUB</span>
        </NavLink>

        <nav className="header__nav">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="header__cta"
        >
          Join Us
        </NavLink>

      </div>
    </header>
  );
}