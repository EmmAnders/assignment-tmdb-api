import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";

//Context. API
import { Context } from "../contexts/Context";
import { getMostPopularMovies } from "../services/API";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const MostPopularMoviesPage = () => {
  const { handleClickToMovieId, staggerElements } = useContext(Context);

  const { data, error, isError, isLoading } = useQuery(
    "popular-movies",
    getMostPopularMovies
  );

  let textArray = [
    " Popular",
    "Popular",
    " Popular",
    "Popular",
    " Popular",
    " Popular",
    " Popular",
    " Popular",
    "Popular",
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
            {data.results.map((movie) => (
              <div ref={addToRefs} key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  subtitle={"Popularity"}
                  voteAverage={movie.popularity}
                ></Card>
              </div>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default MostPopularMoviesPage;
