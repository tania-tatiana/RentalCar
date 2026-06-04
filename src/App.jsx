import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import AppBar from "./components/AppBar/AppBar";
// import HomePage from "./pages/HomePage/HomePage";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
// import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
const CarDetailsPage = lazy(() =>
  import("./pages/CarDetailsPage/CarDetailsPage")
);
// import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : []
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorites = (car) => {
    setFavorites(prev => prev.some(item => item.id === car.id) ? prev.filter(item => item.id !== car.id) : [... prev, car]);
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <AppBar />
      <Toaster position="top-right" reverseOrder={false}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CatalogPage favorites={favorites} onToggleFavorites={toggleFavorites}/>} />
          <Route path="/cars/:id" element={<CarDetailsPage favorites={favorites} onToggleFavorites={toggleFavorites}/>} />
          <Route path="/favorites" element={ <FavoritesPage favorites={favorites} onToggleFavorites={toggleFavorites}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
