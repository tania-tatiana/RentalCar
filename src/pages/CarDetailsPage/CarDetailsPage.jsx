import { useEffect, useState } from "react";
import css from "./CarDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { fetchCarsById } from "../../services/axiosConfig";
import CarForm from "../../components/CarForm/CarForm";
export default function CarDetailsPage() {
  const [cars, setCars] = useState([]);
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetchCarsById(id).then((data) => setCar(data));
  }, [id]);

  const addNewCar = (newCar) => {
    setCars((previousCars) => {
      return [...previousCars, newCar];
    });
  };
  console.log(cars);

  return (
    <>
      {car && (
        <section className={css.section}>
          <div className={css.leftSide}>
            <img src={car.img} alt="Car" className={css.image} />
            <CarForm onSubmit={addNewCar} />
          </div>
          <div className={css.rightSide}>
            <div className={css.carAndId}>
              <h3 className={css.name}>
                {car.brand}&nbsp;{car.model}, {car.yea}
              </h3>
              <p className={css.id}>id: {id}</p>
            </div>
            <div className={css.locationAndMileage}>
              <p className={css.location}>
                {car.address.split(",")[1].trim() || "Unknown city"},{" "}
                {car.address.split(",")[2].trim() || "Unknown country"}
              </p>
              <p className={css.mileage}>Mileage: {car.mileage}</p>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>
            <p className={css.description}>{car.description}</p>

            <div className={css.descriptionItem}>
              <h3 className={css.nameOfList}>Rental Conditions: </h3>
              <ul className={css.list}>
                {car.rentalConditions.map((item, index) => (
                  <li key={index} className={css.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.descriptionItem}>
              <h3 className={css.nameOfList}>Car Specifications:</h3>
              <ul className={css.list}>
                <li className={css.item}>Year: {car.yea}</li>
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
                {[...car.accessories, car.functionalities].map(
                  (item, index) => (
                    <li key={index} className={css.item}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
