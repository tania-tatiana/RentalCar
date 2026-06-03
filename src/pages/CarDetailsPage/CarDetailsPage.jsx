import { useEffect, useState } from "react";
import css from "./CarDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { fetchCarsById } from "../../services/axiosConfig";
import CarForm from "../../components/CarForm/CarForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { TailSpin } from "react-loader-spinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CarDetailsPage({ favorites, onToggleFavorites }) {
  const [cars, setCars] = useState([]);
  const { id } = useParams();
  const [car, setCar] = useState(undefined);

  // const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isFavorite = favorites.some((item) => item.id === car.id);

  useEffect(() => {
    // fetchCarsById(id).then((data) => setCar(data.data));
    const getCar = async () => {
      setLoading(true);
      const data = await fetchCarsById(id);
      setCar(data);
      setLoading(false);
    };

    getCar();
  }, [id]);

  const addNewCar = (newCar) => {
    console.log(cars);

    setCars((previousCars) => {
      return [...previousCars, newCar];
    });
    // setSuccessMessage("Your car rental request was successful!");
  };

  return (
    <>
      {loading && (
        <div className={css.loader}>
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
          />
        </div>
      )}
      {!car && !loading && <NotFoundPage />}
      {car && (
        <section className={css.section}>
          <div className={css.leftSide}>
            <img src={car.img} alt="Car" className={css.image} />
            {/* {successMessage && <p className={css.success}>{successMessage}</p>} */}
            <CarForm onSubmit={addNewCar} />
          </div>
          <div className={css.rightSide}>
            <div className={css.carAndId}>
              <h3 className={css.name}>
                {car.brand}&nbsp;{car.model}, {car.year}
              </h3>
              <p className={css.id}>id: {id}</p>
            </div>
            <div className={css.locationAndMileage}>
              <p className={css.location}>
                {car.address?.split(",")[1]?.trim() || "Unknown city"},{" "}
                {car.address?.split(",")[2]?.trim() || "Unknown country"}
              </p>
              <p className={css.mileage}>
                Mileage: {car.mileage?.toLocaleString("uk-UA")} km
              </p>
            </div>
            <div className={css.priceAndFavorite}>
              <p className={css.price}>${car.rentalPrice}</p>
              <button
                className={css.favorite}
                onClick={() => onToggleFavorites(car)}
              >
                {isFavorite ? (
                  <FaHeart className={css.heartActive} />
                ) : (
                  <FaRegHeart className={css.heart} />
                )}
              </button>
            </div>

            <p className={css.description}>{car.description}</p>
            <div className={css.descriptionItem}>
              <h3 className={css.nameOfList}>Rental Conditions: </h3>
              <ul className={css.list}>
                {car.rentalConditions?.map((item, index) => (
                  <li key={index} className={css.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.descriptionItem}>
              <h3 className={css.nameOfList}>Car Specifications:</h3>
              <ul className={css.list}>
                <li className={css.item}>Year: {car.year}</li>
                <li className={css.item}>Type: {car.type}</li>
                <li className={css.item}>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.item}>Engine Size: {car.engineSize}</li>
              </ul>
            </div>
            <div className={css.descriptionItem}>
              <h3 className={css.nameOfList}>
                Accessories and functionalities:
              </h3>
              <ul className={css.list}>
                {[
                  ...(car.accessories || []),
                  ...(car.functionalities || []),
                ].map((item, index) => (
                  <li key={index} className={css.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
