import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieDetails, getCastByMovieId } from "../services/API";

const MoviePage = () => {
  const { id } = useParams();

  const movieDetails = useQuery(["movie-details", id], () =>
    getMovieDetails(id)
  );

  const movieCast = useQuery(["movie-cast", id], () => getCastByMovieId(id));

  return (
    <>
      {movieDetails.data && (
        <main>
          <h1>{movieDetails.data.title}</h1>
          <p>{movieDetails.data.overview}</p>
        </main>
      )}

      {movieCast.data &&
        Object.keys(movieCast.data.cast).map((item, i) => (
          <div key={i}>
            {movieCast.data.cast[item].known_for_department === "Acting" ? (
              <>
                <p>{movieCast.data.cast[item].name}</p>
                <p> Character: {movieCast.data.cast[item].character}</p>
              </>
            ) : null}
          </div>
        ))}
    </>
  );
};

export default MoviePage;
