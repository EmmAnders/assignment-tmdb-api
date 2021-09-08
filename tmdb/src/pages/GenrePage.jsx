import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getMoviesByGenreId } from "../services/API";

const GenrePage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(["genre-movies", { page, id }], getMoviesByGenreId, {
    keepPreviousData: true,
  });

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h1>GENRE PAGE</h1>

      {isError && <div>{error.message}</div>}

      {isLoading && <div>Loading...</div>}

      {data?.results && (
        <main>
          {data.results.map((movie, i) => (
            <div onClick={() => handleClickToMovieId(movie.id)} key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </main>
      )}

      <div>
        <button onClick={prevPage} disabled={page <= 1}>
          Previous Page
        </button>

        <span>Current Page: {page}</span>

        <button
          onClick={nextPage}
          /*    disabled={isPreviousData || !data.next} */
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default GenrePage;
