import React, { useContext } from "react";
import { useQuery } from "react-query";

//Context, API
import { getTopRatedMovies } from "../services/API";
import { Context } from "../contexts/Context";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const TopRatedMoviesPage = () => {
  const { handleClickToMovieId } = useContext(Context);
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

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <section className="movies-page-container">
          <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
          <section className="page-content">
            {data.results.map((movie, i) => (
              <React.Fragment key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  subtitle={"Average Vote"}
                  voteAverage={movie.vote_average}
                  genre1={movie.genre_ids.map((id) => id).join("/")}
                ></Card>
              </React.Fragment>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default TopRatedMoviesPage;
