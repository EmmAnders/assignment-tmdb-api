import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

//Components
import PageGridModule from "./PageGridModule";
import Card from "../common/Card";

//Styles
import "../../assets/scss/pages/Movies.scss";

const MoviesModule = ({ data }) => {
  const history = useHistory();
  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {data?.results && (
        <PageGridModule>
          {data.results.map((movie) => (
            <div className="card-wrapper" key={movie.id}>
              <Card
                onClick={() => handleClickToMovieId(movie.id)}
                src={movie.poster_path}
                title={movie.title}
                description={movie.overview}
                release={movie.release_date}
                vote_average={movie.vote_average}
              ></Card>
            </div>
          ))}
        </PageGridModule>
      )}
    </>
  );
};

export default MoviesModule;
