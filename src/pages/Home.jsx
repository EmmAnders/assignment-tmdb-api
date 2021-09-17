import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/Context";
import { motion } from "framer-motion";

//Styles
import "../scss/pages/Movies.scss";
import "../scss/pages/Home.scss";

const Home = () => {
  const { baseUrlImg } = useContext(Context);

  return (
    <div className="home-container">
      <motion.div
        className="item-1 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/movies/top-rated">
          <img src={baseUrlImg + "/irVU3PHIdg36Rh8tSKnKCdmHLEO.jpg"} alt="" />
          <p> Top rated</p>
        </Link>
      </motion.div>

      <motion.div
        className="item-2 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link to="/movies/latest">
          <img src={baseUrlImg + "/u1wHUA0R48FH4WV3sGqjwx3aNZm.jpg"} alt="" />
          <p>Latest</p>
        </Link>
      </motion.div>

      <motion.div
        className="item-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Link to="/movies/most-popular">
          <p>Most popular</p>
          <img src={baseUrlImg + "/3clod4q8qkgU7pyOmZ7Re0G7GDc.jpg"} alt="" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
