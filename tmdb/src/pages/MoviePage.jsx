import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";

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
import plusCircle from "../assets/icons/plus-circle.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const MoviePage = () => {
  const { handleClickToMovieId } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [loadMovies, setLoadMovies] = useState(4);
  const [openActor, setOpenActor] = useState(false);

  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  const movieDetails = useQuery(["movie-details", id], () =>
    getMovieDetails(id)
  );

  const movieCast = useQuery(["movie-cast", id], () => getCastByMovieId(id));

  const similarMovies = useQuery(["similar-movies", id], () =>
    getSimiliarMovies(id)
  );

  /*   const all = useQueries([
    { queryKey: ["movie-details", id], queryFn: () => getMovieDetails(id) },
    { queryKey: ["movie-cast", id], queryFn: () => getCastByMovieId(id) },
  ]);
 */

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
    <section className="movie-page-container">
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
            <h2>Overview</h2>
            <p>{movieDetails.data.overview}</p>
          </div>

          <div className="movie-specs-container">
            <div className="specs">
              <p>Genre: </p>
              <div class="name">
                {movieDetails.data.genres.map((genre, i) => (
                  <p key={i}> {genre.name}</p>
                ))}
              </div>
            </div>

            <div className="specs">
              <p> View on: </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${movieDetails.data.imdb_id}`}
              >
                IMDB
              </a>
            </div>

            <div className="specs">
              <p>Release date:</p>
              <p>{movieDetails.data.release_date}</p>
            </div>

            <div className="specs">
              <p>Spoken languages:</p>
              {movieDetails.data.spoken_languages.map((lang, i) => (
                <p key={i}>{lang.iso_639_1}</p>
              ))}
            </div>

            <div className="specs">
              <p>Original Language:</p>
              <p>{movieDetails.data.original_language}</p>
            </div>

            <div className="specs">
              <p>Original title:</p>
              <p>{movieDetails.data.original_title}</p>
            </div>

            <div onClick={handleOpenActor} className="specs dropdown">
              <p>Actors</p>
              <img src={plusCircle} alt="view actors" />
            </div>
          </div>
        </>
      )}

      <>
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
                          {" "}
                          {movieCast.data.cast[item].name} as{" "}
                          <span> {movieCast.data.cast[item].character}</span>
                        </p>
                        <img src={arrowRight} alt="view actor" />
                      </td>
                    ) : null}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
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
                        releaseDate={movie.release_date}
                        voteAverage={movie.vote_average}
                        genre1={movie.genre_ids.map((id) => id).join("/")}
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
    </section>
  );
};

export default MoviePage;
