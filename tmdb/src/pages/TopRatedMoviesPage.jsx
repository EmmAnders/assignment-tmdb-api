import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../services/API";

import Card from "../components/Card";
import "../scss/pages/Movies.scss";

const TopRatedMoviesPage = () => {
  const history = useHistory();

  const { data, error, isError, isLoading } = useQuery(
    "top-rated-movies",
    getTopRatedMovies
  );

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <main className="page-wrapper">
          <section className="header">
            <h1>Top Rated Movies</h1>
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
                  /*   originalTitle={movie.original_title}
                  originalLanguage={movie.original_language} */
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  genre1={movie.genre_ids.map((id) => id).join("/")}
                ></Card>
              </div>
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default TopRatedMoviesPage;
