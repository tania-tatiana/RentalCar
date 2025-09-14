import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = async (
  { brand, price, mileageFrom, mileageTo },
  currentPage
) => {
  const response = await axios.get("/cars", {
    params: {
      brand,
      price,
      mileageFrom,
      mileageTo,
      page: currentPage,
      hitsPerPage: 5,
    },
  });
  return response.data;
};

export const fetchCarsById = async (id) => {
  const response = await axios.get(`cars/${id}`);
  return response.data;
};

export const fetchBrands = async () => {
  const response = await axios.get("/brands");
  return response.data;
};
