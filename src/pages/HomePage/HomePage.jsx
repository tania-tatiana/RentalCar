import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <section className={css.section}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link to="/cars" className={css.button}>
          View Catalog
        </Link>
      </section>
    </>
  );
}
