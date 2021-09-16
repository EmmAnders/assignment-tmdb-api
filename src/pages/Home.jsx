import React, { useState, useEffect, useContext } from "react";
import { Context } from "../contexts/Context";

import { search } from "../services/API";
import { useQuery } from "react-query";
import Search from "../components/Search";

import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const Home = () => {
  const { handleClickToMovieId } = useContext(Context);

  return <div>HOME</div>;
};

export default Home;
