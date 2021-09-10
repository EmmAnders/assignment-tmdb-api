import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

import "../scss/components/Navbar.scss";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <nav>
      <ul>
        <div>
          <li onClick={handleOpenDropdown}>MOVIES BY GENRE</li>
          
          <li>
            <NavLink to="/movies/top-rated">TOP RATED</NavLink>
          </li>

          <li>
            <NavLink to="/movies/most-popular">MOST POPULAR</NavLink>
          </li>
        </div>
        {openDropdown && (
          <div className="genre-links">
            <NavbarLinks />
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
