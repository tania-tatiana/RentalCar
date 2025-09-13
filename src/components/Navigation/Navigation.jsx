import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getActiveLinksClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={getActiveLinksClass}>
        Home
      </NavLink>
      <NavLink to="/cars" className={getActiveLinksClass}>
        Catalog
      </NavLink>
    </nav>
  );
}
