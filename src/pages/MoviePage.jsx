import React, { useState, useContext, useRef, useEffect } from "react";
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
import MoviesModule from "../components/modules/MoviesModule";
import HeadingLg from "../components/HeadingLg";
import HeadingSm from "../components/HeadingSm";
import Row from "../components/Row";
import Button from "../components/common/Btn";

//Styles
import "../assets/scss/pages/Movie.scss";
import ArrowUpRight from "../components/fragments/ArrowUpRight";

const MoviePage = () => {
  const { handleClickToMovieId } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [loadMovies, setLoadMovies] = useState(4);
  const [openActors, setOpenActors] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

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

  const handleOpenActors = () => {
    setOpenActors(!openActors);
  };

  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <section className="details-page">
      {movieDetails.data && (
        <>
          <HeadingLg
            className="title"
            text={movieDetails.data.title}
          ></HeadingLg>

          <section className="details-page-section-1">
            <div className="details-page-section-1-inner inner-left">
              <div className="poster">
                <img
                  src={baseUrlImg + movieDetails.data.poster_path}
                  alt={movieDetails.data.title}
                />
              </div>
            </div>

            <div className="details-page-section-1-inner inner-right">
              <div>
                <p>{movieDetails.data.overview}</p>
              </div>
            </div>
          </section>
          {/* End of Section 1 */}

          <section
            onClick={handleOpenDetails}
            className="details-page-section-2"
          >
            <Button
              open={openDetails}
              className={"heading"}
              text={"details"}
            ></Button>

            {openDetails && (
              <div className="details-page-section-2-info-inner">
                <Row
                  label="original title"
                  text={movieDetails.data.original_title}
                />
                <Row
                  label="original language"
                  text={movieDetails.data.original_language}
                />
                <Row
                  label="release date"
                  text={movieDetails.data.release_date}
                />

                <Row label="runtime" text={movieDetails.data.runtime} />

                <Row
                  label="vote average"
                  text={movieDetails.data.vote_average}
                />
                <Row label="vote count" text={movieDetails.data.vote_count} />
                <div className="genre">
                  <p className="label">Genre</p>
                  <div className="text">
                    {movieDetails.data.genres.map((genre, i) => (
                      <p key={i}>{genre.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      <section onClick={handleOpenActors} className="details-page-section-3">
        <Button
          open={openActors}
          className={"heading"}
          text={"actors"}
        ></Button>
        {openActors && (
          <div>
            {movieCast.data &&
              Object.keys(movieCast.data.cast).map((item, i) => (
                <React.Fragment key={i}>
                  {movieCast.data.cast[item].known_for_department ===
                  "Acting" ? (
                    <div
                      onClick={() =>
                        handleClickToActorId(movieCast.data.cast[item].id)
                      }
                    >
                      <Row
                        label={`${movieCast.data.cast[item].name} as -
                      ${movieCast.data.cast[item].character}`}
                        text="view"
                        icon={<ArrowUpRight />}
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
          </div>
        )}
      </section>

      <section className="details-page-section-4">
        <HeadingSm text="You might also like"></HeadingSm>
        {similarMovies?.data && <MoviesModule data={similarMovies.data} />}
      </section>
    </section> /* End */
  ); //END
};

export default MoviePage;
