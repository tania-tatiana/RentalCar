import { useEffect, useState } from "react";
import CarList from "../../components/CarList/CarList";
import { fetchCars } from "../../services/axiosConfig";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [car, setCar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = (newCar) => {
    setCar(newCar);
    setCurrentPage(1);
    setCars([]);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const newCar = await fetchCars(car, currentPage);
        setCars((previousCars) => {
          const existingIds = new Set(previousCars.map((car) => car.id));
          const uniqueNewCars = newCar.cars.filter(
            (car) => !existingIds.has(car.id)
          );
          return [...previousCars, ...uniqueNewCars];
        });
        setTotalPages(newCar.totalPages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, car]);

  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p>Loading</p>}
      {cars.length > 0 && <CarList cars={cars} />}
      {cars.length > 0 && !isLoading && currentPage !== totalPages && (
        <button onClick={incrementPage} className={css.button}>
          Load more
        </button>
      )}
    </>
  );
}
