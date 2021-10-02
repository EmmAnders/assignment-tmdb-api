import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";

//Context. API
import { Context } from "../contexts/Context";
import { getMostPopularMovies } from "../services/API";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Animation
import skewElements from "../components/animation/SkewElements";

const MoviesPopular = () => {
  const { handleClickToMovieId } = useContext(Context);

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
                  releaseDate={movie.release_date}
                  subtitle={"Popularity"}
                  voteAverage={movie.popularity}
                ></Card>
              </div>
            ))}
          </PageGridModule>
        </>
      )}
    </>
  );
};

export default MoviesPopular;
