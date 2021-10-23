import React, { useState, useContext, useRef, useEffect } from "react";

import skewX from "/Users/emma/Documents/assignment-tmdb-api/src/components/animation/SkewX.js";

//Styles
import "../../assets/scss/components/modules/PageHorizontalScroll.scss";

const PageHorizontalScroll = ({ children }) => {
  const container = useRef(null);

  useEffect(() => {
    skewX(container.current);
  });

  return (
    <section ref={container} className="page-horizontal-scroll">
      {children}
    </section>
  );
};

export default PageHorizontalScroll;
