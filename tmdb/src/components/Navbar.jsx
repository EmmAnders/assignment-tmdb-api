import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/movies/top-rated">TOP RATED MOVIES</NavLink>
        </li>
        <li>
          <NavbarLinks />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
