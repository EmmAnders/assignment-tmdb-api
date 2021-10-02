import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";

import skewElements from "../components/animation/SkewElements";

//Context, API
import { getLatestMovies } from "../services/API";
import { Context } from "../contexts/Context";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const MoviesLatest = () => {
  const { handleClickToMovieId } = useContext(Context);

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

  const elements = useRef(null);
  elements.current = [];

  const addToRefs = (el) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
    }
  };

  useEffect(() => {
    skewElements(elements.current);
  });

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}

      {data?.results && (
        <>
          <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
          <PageGridModule>
            {data.results.map((movie) => (
              <div ref={addToRefs} key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                ></Card>
              </div>
            ))}
          </PageGridModule>
        </>
      )}
    </>
  );
};

export default MoviesLatest;
