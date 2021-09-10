import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import { getMoviesByGenreId } from "../services/API";

const GenrePage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [params, setParams] = useUrlSearchParams({ page: 1 }, { page: Number });
  const [page, setPage] = useState(params.page);

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

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setParams({ ...params, page });
  }, [page]);

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname) {
        setPage(1);
      }
    });
  }, [id]);

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

          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <h4>
            Page {page} of {data.total_pages}
          </h4>

          <button
            onClick={() => {
              if (!isPreviousData && data.page) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data.page}
          >
            Next
          </button>
        </main>
      )}
    </div>
  );
};

export default GenrePage;
