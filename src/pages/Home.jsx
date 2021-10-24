import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/Context";
import { motion } from "framer-motion";

//Styles
import "../assets/scss/pages/Movies.scss";
import "../assets/scss/pages/Home.scss";

const Home = () => {
  const { baseUrlImg } = useContext(Context);

  return <div className="home-container">Home</div>;
};

export default Home;
