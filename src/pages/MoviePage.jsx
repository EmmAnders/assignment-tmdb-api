import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";

//Context, API
import { getMovieDetails, getSimiliarMovies } from "../services/API";
import { Context } from "../contexts/Context";

import { motion } from "framer-motion";
import { PageAnimation, fade } from "../components/animation/animation.js";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeading from "../components/common/MarqueeHeading";
import MarqueeSubheading from "../components/common/MarqueeSubheading";
import Row from "../components/Row";
import Button from "../components/common/Btn";
import LoadMoreBtn from "../components/common/LoadMoreBtn";
import BackButton from "../components/common/BackButton";
import Card from "../components/Card";

//Styles
import "../assets/scss/pages/Movie.scss";
import ArrowUpRight from "../components/fragments/ArrowUpRight";

const MoviePage = () => {
  const { handleClickToMovieId } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [titleArray, setTitleArray] = useState([]);
  const [subtitleArray, setSubitleArray] = useState([
    "You might also like",
    "You might also like",
    "You might also like",
    "You might also like",
  ]);
  const [loadMovies, setLoadMovies] = useState(4);
  const [openActors, setOpenActors] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  const movieDetails = useQuery(["movie-details", id], () =>
    getMovieDetails(id)
  );
  const similarMovies = useQuery(["similar-movies", id], () =>
    getSimiliarMovies(id)
  );

  const handleClickToActorId = (actorId) => {
    history.push(`/movies/actor/${actorId}`);
    window.scrollTo(0, 0);
  };

  //Names for animation on heading
  useEffect(() => {
    if (movieDetails.data) {
      setTitleArray([
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
        movieDetails.data.title,
      ]);
    }
  }, [movieDetails.data]);

  return (
    <motion.section
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      className="details-page"
    >
      <BackButton />
      {movieDetails.data && (
        <>
          <MarqueeHeading textArray={titleArray}></MarqueeHeading>
          <section className="details-page-section-1">
            <div className="details-page-section-1-inner inner-left">
              <div className="poster">
                <motion.img
                  variants={fade}
                  src={baseUrlImg + movieDetails.data.poster_path}
                  alt={movieDetails.data.title}
                />
              </div>
            </div>

            <div className="details-page-section-1-inner inner-right">
              <motion.div variants={fade}>
                <p>{movieDetails.data.overview}</p>
              </motion.div>
            </div>
          </section>
          <motion.section
            variants={fade}
            onClick={() => setOpenDetails(!openDetails)}
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
          </motion.section>
        </>
      )}

      <section
        onClick={() => setOpenActors(!openActors)}
        className="details-page-section-3"
      >
        <Button
          open={openActors}
          className={"heading"}
          text={"actors"}
        ></Button>

        {openActors && (
          <>
            {movieDetails.data.credits.cast.map((actor, i) => (
              <div key={i} onClick={() => handleClickToActorId(actor.id)}>
                <Row
                  label={`${actor.name} as - ${actor.character}`}
                  text="view"
                  icon={<ArrowUpRight />}
                />
              </div>
            ))}
          </>
        )}
      </section>

      <section className="details-page-section-4">
        <MarqueeSubheading textArray={subtitleArray}></MarqueeSubheading>
        {similarMovies?.data && (
          <>
            <PageGridModule>
              {similarMovies.data.results.map((movie, i) => {
                if (i === loadMovies) {
                  return null;
                } else if (i < loadMovies) {
                  return (
                    <div className="card-wrapper" key={movie.id}>
                      <Card
                        onClick={() => handleClickToMovieId(movie.id)}
                        src={movie.poster_path}
                        title={movie.title}
                      ></Card>
                    </div>
                  );
                }
              })}
            </PageGridModule>
            {loadMovies < similarMovies.data.results.length ? (
              <LoadMoreBtn
                onClick={() => setLoadMovies(loadMovies + 8)}
              ></LoadMoreBtn>
            ) : (
              ""
            )}
          </>
        )}
      </section>
    </motion.section>
  );
};

export default MoviePage;
