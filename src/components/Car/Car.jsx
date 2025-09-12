import { useState } from "react";
import CarForm from "../CarForm/CarForm";
import css from "./Car.module.css";
export default function Car() {
  const [cars, setCars] = useState([]);

  const addNewCar = (newCar) => {
    setCars((previousCars) => {
      return [...previousCars, newCar];
    });
  };
  console.log(cars);

  return (
    <>
      <section className={css.section}>
        <div className={css.leftSide}>
          <img src="../../assets/Car.png" alt="Car" className={css.image} />
          <CarForm onSubmit={addNewCar} />
        </div>
        <div className={css.rightSide}>
          <div className={css.carAndId}>
            <h3 className={css.name}>Buick Enclave, 2008</h3>
            <p className={css.id}>Id: {}</p>
          </div>
          <div className={css.locationAndMileage}>
            <p className={css.location}>Kyiv, Ukraine</p>
            <p className={css.mileage}>Mileage: {}</p>
          </div>
          <p className={css.price}>$40</p>
          <p className={css.description}>
            The Buick Enclave is a stylish and spacious SUV known for its
            comfortable ride and luxurious features.
          </p>

          <div className={css.descriptionItem}>
            <h3 className={css.nameOfList}>Rental Conditions: </h3>
            <ul className={css.list}>
              <li className={css.item}>Minimum age : {}</li>
              <li className={css.item}>Security deposite required </li>
              <li className={css.item}>Valid driver's license</li>
            </ul>
          </div>
          <div className={css.descriptionItem}>
            <h3 className={css.nameOfList}>Car Specifications:</h3>
            <ul className={css.list}>
              <li className={css.item}>Year: {}</li>
              <li className={css.item}>Type: {}</li>
              <li className={css.item}>Fuel Consumption: {}</li>
              <li className={css.item}>Engine Size: {}</li>
            </ul>
          </div>
          <div className={css.descriptionItem}>
            <h3 className={css.nameOfList}>Accessories and functionalities:</h3>
            <ul className={css.list}>
              <li className={css.item}>Leather seats</li>
              <li className={css.item}>Panoramic sunroof</li>
              <li className={css.item}>Remote start</li>
              <li className={css.item}>Blind-spot monitoring</li>
              <li className={css.item}>Power liftgate</li>
              <li className={css.item}>Premium audio system</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
