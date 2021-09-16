import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";

//Context, API
import { getLatestMovies } from "../services/API";
import { Context } from "../contexts/Context";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

//Animation
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const LatestMoviesPage = () => {
  const { handleClickToMovieId, staggerElements } = useContext(Context);

  const { data, error, isError, isLoading } = useQuery(
    "latest-movies",
    getLatestMovies
  );

  // Text Array for Heading
  let textArray = [
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
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
                ></Card>
              </div>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default LatestMoviesPage;
