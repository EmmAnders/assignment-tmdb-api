import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/Context";

import ArrowRight from "../components/fragments/ArrowRight";
import Row from "../components/Row";

//Styles
import "../assets/scss/pages/Home.scss";

const Home = () => {
  const { baseUrlImg } = useContext(Context);

  // use for later
  /*  const images = [
    "/5hNcsnMkwU2LknLoru73c76el3z.jpg",
    "/bf9shWfUKyEB5oB7awJeKIoCehl.jpg",
    "/3KwAmIKMaDcBMonF5wmyNTL0SR6.jpg",
    "/194dso1hBwQEgIU3fgS7mXHtFAj.jpg",
    "/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg",
    "/7TZhRHh9fikzUVGbWCtdtxYOLxP.jpg",
    "/YLyORLsYIjC0d1TFBSpJKk7piP.jpg",
    "/d0IwJw1p2H0WYhk1iCwVNygpsUs.jpg",
    "/dua5ojcdfLjdwgO911H9HX3a5tV.jpg",
    "/u3tkHXc5wzRFfRXyjGsAlfCIJuh.jpg",
  ]; */

  return (
    <div className="home-container">
      {/*    <div className="grid">
        {images.map((url, i) => (
          <div className={`grid__item pos-${i + 1}`}>
            <div
              style={{ backgroundImage: "url(" + baseUrlImg + url + ")" }}
              className="grid__item-img"
            ></div>
          </div>
        ))}
      </div>
 */}
      <Link to={"/movies/latest"}>Latest </Link>
      <Link to={"/movies/most-popular"}>Popular </Link>
      <Link to={"/movies/top-rated"}> Top rated </Link>
    </div>
  );
};

export default Home;
