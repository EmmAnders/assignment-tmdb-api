import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/Context";

import PageGridModule from "../components/modules/PageGridModule";

//Styles
import "../assets/scss/pages/Home.scss";

const Home = () => {
  const { baseUrlImg } = useContext(Context);

  // use for later
  const images = [
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
  ];

  return (
    <div className="home-container">
      <PageGridModule>
        <div className="home-container-inner">
          <p>TMDB MOVIES</p>
        </div>
        <div>
          <Link to={"/movies/latest"}>Latest </Link>
        </div>
        <div>
          <Link to={"/movies/most-popular"}>Popular </Link>
        </div>
        <div>
          <Link to={"/movies/top-rated"}> Top rated </Link>
        </div>
      </PageGridModule>
    </div>
  );
};

export default Home;
