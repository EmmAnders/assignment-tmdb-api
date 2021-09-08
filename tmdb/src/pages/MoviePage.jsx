import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieDetails, getCastByMovieId } from "../services/API";

const MoviePage = () => {
  const { id } = useParams();
  const history = useHistory();

  const movieDetails = useQuery(["movie-details", id], () =>
    getMovieDetails(id)
  );

  const movieCast = useQuery(["movie-cast", id], () => getCastByMovieId(id));

  const handleClickToActorId = (actorId) => {
    history.push(`/movies/actor/${actorId}`);
    window.scrollTo(0, 0);
  };

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
              <div
                onClick={() =>
                  handleClickToActorId(movieCast.data.cast[item].id)
                }
              >
                <p>{movieCast.data.cast[item].name}</p>
                <p> Character: {movieCast.data.cast[item].character}</p>
              </div>
            ) : null}
          </div>
        ))}
    </>
  );
};

export default MoviePage;
