import { Link } from "react-router-dom";
import css from "./CarList.module.css";
export default function CarList({ cars }) {
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
            </div>
            <p className={css.detailsLine}>
              {car.type} | {car.mileage}
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
