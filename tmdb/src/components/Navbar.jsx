import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/movies/top-rated">TOP RATED MOVIES</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
