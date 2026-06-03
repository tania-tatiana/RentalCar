import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import css from "./CarList.module.css";
export default function CarList({ cars, favorites, onToggleFavorites }) {
  const isFavorites = favorites.some((favorite) => favorite.id === cars.id);
  return (
    <ul className={css.list}>
      {cars.map((car) => {
        const parts = car.address.split(",").map((car) => car.trim());
        const city = parts[1] || "Unknown city";
        const country = parts[2] || "Unknown country";

        return (
          <li key={car.id} className={css.item}>
            <img src={car.img} alt="Car" className={css.image} />
            <div className={css.firstLine}>
              <h3 className={css.brand}>
                {car.brand}&nbsp;
                <span className={css.model}>{car.model}</span>, {car.year}
              </h3>
              <h3 className={css.rentalPrice}>{car.rentalPrice}</h3>
            </div>
            <div className={css.secondLine}>
              <p className={css.detailsLine}>
                {city} | {country} | {car.rentalCompany}
              </p>
              <button
                className={css.favorite}
                onClick={() => onToggleFavorites(car)}
              >
                {isFavorites ? (
                  <FaHeart className={css.heartActive} />
                ) : (
                  <FaRegHeart className={css.heart} />
                )}
              </button>
            </div>
            <p className={css.detailsLine}>
              {car.type} | {car.mileage.toLocaleString("uk-UA")}
            </p>
            <Link className={css.button} to={`/cars/${car.id}`}>
              Read more
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
