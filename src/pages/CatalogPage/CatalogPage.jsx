import { useEffect, useState } from "react";
import CarList from "../../components/CarList/CarList";
import { fetchCars } from "../../services/axiosConfig";
import css from "./CatalogPage.module.css";
import Filter from "../../components/Filter/Filter";
import { useSearchParams } from "react-router-dom";

export default function CatalogPage() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (newFilters) => {
    const filteredParams = Object.entries(newFilters).reduce(
      (acc, [key, value]) => {
        if (value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    setSearchParams(filteredParams);
    setCurrentPage(1);
    setCars([]);
  };

  const filters = {
    brand: searchParams.get("brand") || "",
    price: searchParams.get("price") ? Number(searchParams.get("price")) : "",
    mileageFrom: searchParams.get("mileageFrom") || "",
    mileageTo: searchParams.get("mileageTo") || "",
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const newCar = await fetchCars(filters, currentPage);
        setCars((prevCars) => {
          const existingIds = new Set(prevCars.map((car) => car.id));
          const uniqueNewCars = newCar.cars.filter(
            (car) => !existingIds.has(car.id)
          );
          return [...prevCars, ...uniqueNewCars];
        });
        setTotalPages(newCar.totalPages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, searchParams]);

  const filteredCars = cars.filter((car) => {
    return (
      (filters.brand ? car.brand === filters.brand : true) &&
      (filters.price
        ? Number(car.rentalPrice) === Number(filters.price)
        : true) &&
      (filters.mileageFrom
        ? car.mileage >= Number(filters.mileageFrom)
        : true) &&
      (filters.mileageTo ? car.mileage <= Number(filters.mileageTo) : true)
    );
  });

  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p>Loading</p>}
      {<Filter onFilter={handleSearch} />}
      {filteredCars.length > 0 ? (
        <CarList cars={filteredCars} />
      ) : (
        !isLoading && <p>Cars not found</p>
      )}
      {filteredCars.length > 0 && !isLoading && currentPage !== totalPages && (
        <button onClick={incrementPage} className={css.button}>
          Load more
        </button>
      )}
    </>
  );
}
