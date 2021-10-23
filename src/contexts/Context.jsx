import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { useQuery } from "react-query";
import { search } from "../services/API";

export const Context = createContext();

//Animation
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

const ContextProvider = (props) => {
  const history = useHistory();
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryParam("keyword", StringParam);

  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
    isIdle,
    refetch,
  } = useQuery(
    ["search-movies", searchQuery],
    () => {
      if (searchQuery) {
        return search(searchQuery);
      }
    },
    {
      keepPreviousData: true,
      /*  enabled: false, */
    }
  );

  const handleSearch = () => {
    setOpenSearch(!openSearch);

    if (!openSearch) {
      document.body.classList.add("overflow-hidden");
    }

    if (openSearch) {
      document.body.classList.remove("overflow-hidden");
    }

    setIsExpanded(false);
  };

  const handleMenu = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      document.body.classList.add("site-navigation-expanded");
    }

    if (isExpanded) {
      document.body.classList.remove("site-navigation-expanded");
    }
    setOpenSearch(false);
  };

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    window.scrollTo(0, 0);
  };

  const values = {
    handleClickToMovieId,
    baseUrlImg,
    searchQuery,
    setSearchQuery,
    openSearch,
    setOpenSearch,
    handleMenu,
    isExpanded,
    handleSearch,
    data,
    refetch,
  };

  return <Context.Provider value={values}>{props.children}</Context.Provider>;
};

export default ContextProvider;
