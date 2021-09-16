import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { gsap } from "gsap";

//Context, API
import { getTopRatedMovies } from "../services/API";
import { Context } from "../contexts/Context";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const TopRatedMoviesPage = () => {
  const { handleClickToMovieId, staggerElements } = useContext(Context);
  const { data, error, isError, isLoading } = useQuery(
    "top-rated-movies",
    getTopRatedMovies
  );

  const textArray = [
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
  ];

  // Animation
  const revealContent = useRef(null);
  revealContent.current = [];

  const addToRefs = (el) => {
    if (el && !revealContent.current.includes(el)) {
      revealContent.current.push(el);
    }
  };

  useEffect(() => {
    revealContent.current.forEach((el, index) => {
      staggerElements(el);
    });
  });

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <section className="movies-page-container">
          <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
          <section className="page-content">
            {data.results.map((movie, i) => (
              <div ref={addToRefs} key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  subtitle={"Average Vote"}
                  voteAverage={movie.vote_average}
                  genre1={movie.genre_ids.map((id) => id).join("/")}
                ></Card>
              </div>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default TopRatedMoviesPage;
