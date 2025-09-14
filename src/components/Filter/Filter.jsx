import { useEffect, useState } from "react";
import css from "./Filter.module.css";
import { fetchBrands } from "../../services/axiosConfig";

export default function Filter({ onFilter }) {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const [isError, setIsError] = useState(false);

  const prices = [30, 40, 50, 60, 70, 80];

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ brand, price: Number(price), mileageFrom, mileageTo });
  };

  useEffect(() => {
    const getBrands = async () => {
      try {
        setIsError(false);
        const data = await fetchBrands();
        setBrands(data);
      } catch {
        setIsError(true);
      }
    };
    getBrands();
  }, []);

  return (
    <>
      {isError && <p>Loading</p>}
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          Car brand
          <select
            className={css.select}
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          >
            <option value="" className={css.option} disabled>
              Choose a brand
            </option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={css.label}>
          Price/ 1 hour
          <select
            className={css.select}
            value={price}
            placeholder="Choose a price"
            onChange={(event) => setPrice(event.target.value)}
          >
            <option value="" className={css.option} disabled>
              Choose a price
            </option>
            {prices.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={css.label}>
          Сar mileage / km
          <div className={css.inputs}>
            <input
              className={css.inputFrom}
              type="number"
              placeholder="Mileage From"
              value={mileageFrom}
              onChange={(event) => setMileageFrom(event.target.value)}
            />
            <input
              className={css.inputTo}
              type="number"
              placeholder="Mileage To"
              value={mileageTo}
              onChange={(event) => setMileageTo(event.target.value)}
            />
          </div>
        </label>

        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </>
  );
}
