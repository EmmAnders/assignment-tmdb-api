import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import { getMoviesByGenreId } from "../services/API";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import "../scss/pages/Movies.scss";

const GenrePage = () => {
  const { id, name } = useParams();
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
      {isError && <div>{error.message}</div>}

      {isLoading && <div>Loading...</div>}

      {data?.results && (
        <main className="page-wrapper">
          <section className="header">
            <h1>{name} Movies</h1>
          </section>
          <section className="content">
            {data.results.map((movie, i) => (
              <div
                onClick={() => handleClickToMovieId(movie.id)}
                key={movie.id}
              >
                <Card
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  genre1={movie.genre_ids.map((id) => id).join("/")}
                ></Card>
              </div>
            ))}
          </section>
          
          <Pagination
            onClickPrevious={() => setPage((old) => Math.max(old - 1, 1))}
            disabledPrevious={page === 1}
            page={page}
            totalPages={data.total_pages}
            onClickNext={() => {
              if (!isPreviousData && data.page) {
                setPage((old) => old + 1);
              }
            }}
            disabledNext={isPreviousData || !data.page}
          ></Pagination>
        </main>
      )}
    </div>
  );
};

export default GenrePage;
