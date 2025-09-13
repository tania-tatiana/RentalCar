import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
// import HomePage from "./pages/HomePage/HomePage";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
// import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
const CarDetailsPage = lazy(() =>
  import("./pages/CarDetailsPage/CarDetailsPage")
);
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
import { lazy, Suspense } from "react";

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CatalogPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
