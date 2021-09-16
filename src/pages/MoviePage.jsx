import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

//Context, API
import {
  getMovieDetails,
  getCastByMovieId,
  getSimiliarMovies,
} from "../services/API";
import { Context } from "../contexts/Context";

//Components
import HeadingLg from "../components/HeadingLg";
import HeadingSm from "../components/HeadingSm";
import Button from "../components/Button";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movie.scss";

//Icons
import plus from "../assets/icons/plus.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const MoviePage = () => {
  const { handleClickToMovieId } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [loadMovies, setLoadMovies] = useState(4);
  const [openActor, setOpenActor] = useState(false);
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  //Animation

  //Fetching data
  const movieDetails = useQuery(["movie-details", id], () =>
    getMovieDetails(id)
  );
  const movieCast = useQuery(["movie-cast", id], () => getCastByMovieId(id));
  const similarMovies = useQuery(["similar-movies", id], () =>
    getSimiliarMovies(id)
  );

  const handleClickToActorId = (actorId) => {
    history.push(`/movies/actor/${actorId}`);
    window.scrollTo(0, 0);
  };

  const handleLoadMore = () => {
    setLoadMovies(loadMovies + 4);
  };

  const handleOpenActor = () => {
    setOpenActor(!openActor);
  };

  return (
    <motion.section
      className="movie-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {movieDetails.data && (
        <>
          <HeadingLg
            className="title"
            text={movieDetails.data.title}
          ></HeadingLg>

          <div className="poster">
            <img
              src={baseUrlImg + movieDetails.data.poster_path}
              alt={movieDetails.data.title}
            />
          </div>

          <div className="overview">
            <p>{movieDetails.data.overview}</p>
          </div>

          <div className="specs">
            <div>
              <p>{movieDetails.data.original_title.toUpperCase()}</p>

              <p>{movieDetails.data.release_date}</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${movieDetails.data.imdb_id}`}
              >
                IMDB
              </a>
              <p>{movieDetails.data.original_language.toUpperCase()}</p>
            </div>

            <div>
              {movieDetails.data.genres.map((genre, i) => (
                <p key={i}> {genre.name.toUpperCase()}</p>
              ))}
            </div>

            <div onClick={handleOpenActor} className="dropdown">
              <button>
                <p> Actors </p> <img src={plus} alt="view actors" />
              </button>
            </div>
          </div>
        </>
      )}

      <>
        <div className="movie-actors-container">
          {openActor && (
            <table className="table">
              <tbody>
                {movieCast.data &&
                  Object.keys(movieCast.data.cast).map((item, i) => (
                    <tr key={i}>
                      {movieCast.data.cast[item].known_for_department ===
                      "Acting" ? (
                        <td
                          onClick={() =>
                            handleClickToActorId(movieCast.data.cast[item].id)
                          }
                        >
                          <p>
                            {movieCast.data.cast[item].name} as{" "}
                            <span> {movieCast.data.cast[item].character}</span>
                          </p>
                          <div className="cta-flex">
                            View profile
                            <img src={arrowRight} alt="view actor" />
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </>

      <div className="movies-container">
        <HeadingSm text="You might also like"></HeadingSm>
        {similarMovies?.data && (
          <>
            <div className="movies">
              {similarMovies.data.results.map((movie, i) => {
                if (i === loadMovies) {
                  return null;
                } else if (i < loadMovies) {
                  return (
                    <React.Fragment key={i}>
                      <Card
                        onClick={() => handleClickToMovieId(movie.id)}
                        src={movie.backdrop_path}
                        title={movie.title}
                      ></Card>
                    </React.Fragment>
                  );
                }
              })}
            </div>
            {loadMovies < similarMovies.data.results.length ? (
              <Button
                className="btn-wrapper"
                cta="Load more"
                onClick={handleLoadMore}
              ></Button>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </motion.section>
  );
};

export default MoviePage;
