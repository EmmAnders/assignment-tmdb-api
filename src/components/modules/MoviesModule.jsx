import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

//Components
import PageGridModule from "./PageGridModule";
import Card from "../Card";

//Styles
import "../../assets/scss/pages/Movies.scss";

const MoviesModule = ({ data }) => {
  const history = useHistory();
  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  const revealContent = useRef(null);
  revealContent.current = [];

  const addToRefs = (el) => {
    if (el && !revealContent.current.includes(el)) {
      revealContent.current.push(el);
    }
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
              ></Card>
            </div>
          ))}
        </PageGridModule>
      )}
    </>
  );
};

export default MoviesModule;
