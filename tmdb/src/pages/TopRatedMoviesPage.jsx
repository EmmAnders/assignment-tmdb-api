import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../services/API";


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

  {data && (console.log(data))}

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <main>
          {data.results.map((movie, i) => (
            <p onClick={() => handleClickToMovieId(movie.id)} key={movie.id}>
              {i + 1}. {movie.title}
            </p>
          ))}
        </main>
      )}
     
    </>
  );
};

export default TopRatedMoviesPage;
