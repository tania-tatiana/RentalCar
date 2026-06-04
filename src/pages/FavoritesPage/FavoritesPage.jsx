import { useState } from "react";
import css from "./FavoritesPage.module.css";
import CarList from "../../components/CarList/CarList";
import { TailSpin } from "react-loader-spinner";

export default function FavoritesPage({ favorites, onToggleFavorites }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const itemsPerPage = 4;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const visibleCars = favorites.slice(0, visibleCount);

  const incrementPage = () => {
    if (isLoadingMore || visibleCount >= favorites.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + itemsPerPage)
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className={ css.page}>
      {favorites.length > 0 ? (
        <CarList
          cars={visibleCars}
          favorites={favorites}
          onToggleFavorites={onToggleFavorites}
        />
      ) : (
        <p>Cars not found</p>
      )}
      {favorites.length > 0 &&
        visibleCount < favorites.length && (
          <button
            onClick={incrementPage}
            className={css.button}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <TailSpin height="20" width="20" color="#3470ff" />
            ) : (
              "Load more"
            )}
          </button>
        )}
    </div>
  );
}
