import css from "./MainPage.module.css";
export default function MainPage() {
  return (
    <>
      <section className={css.section}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <button type="button" className={css.button}>
          View Catalog
        </button>
      </section>
    </>
  );
}
