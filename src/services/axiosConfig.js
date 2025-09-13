import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = async (car, currentPage) => {
  const response = await axios.get("/cars", {
    params: {
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
