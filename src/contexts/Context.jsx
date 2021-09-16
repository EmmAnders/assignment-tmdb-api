import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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

  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClickToMovieId = (movieId) => {
    history.push(`/movies/${movieId}`);
    history.go();
    window.scrollTo(0, 0);
  };

  // Gsap animation - Stagger elements
  const staggerElements = (el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      {
        duration: 1,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top center +=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  const values = {
    handleClickToMovieId,
    baseUrlImg,
    searchQuery,
    setSearchQuery,
    openSearch,
    setOpenSearch,
    staggerElements,
  };

  return <Context.Provider value={values}>{props.children}</Context.Provider>;
};

export default ContextProvider;
