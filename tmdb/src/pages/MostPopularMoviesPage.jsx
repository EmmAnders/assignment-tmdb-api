import React, { useContext } from "react";
import { useQuery } from "react-query";

//Context. API
import { Context } from "../contexts/Context";
import { getMostPopularMovies } from "../services/API";

//Components
import HeadingLg from "../components/HeadingLg";
import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const MostPopularMoviesPage = () => {
  const { handleClickToMovieId } = useContext(Context);

  const { data, error, isError, isLoading } = useQuery(
    "popular-movies",
    getMostPopularMovies
  );

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}

      {data?.results && (
        <section className="movies-page-container">
          <HeadingLg text="Most popular"></HeadingLg>
          <section className="page-content">
            {data.results.map((movie) => (
              <React.Fragment key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  subtitle={"Popularity"}
                  voteAverage={movie.popularity}
                ></Card>
              </React.Fragment>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default MostPopularMoviesPage;
