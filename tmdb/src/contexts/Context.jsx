import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const history = useHistory();
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  const [searchQuery, setSearchQuery] = useState("");

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  const values = {
    handleClickToMovieId,
    baseUrlImg,
    searchQuery,
    setSearchQuery,
  };

  return <Context.Provider value={values}>{props.children}</Context.Provider>;
};

export default ContextProvider;
