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
        <NavbarLinks />
      </ul>
    </nav>
  );
};

export default Navbar;
