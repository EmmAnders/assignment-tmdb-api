import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

import "../scss/components/Navbar.scss";
import arrow from "../assets/icons/arrow-right.svg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleGenreOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <header>
      <nav>
        <div
          onClick={handleMenu}
          className={openMenu ? "show" : "hidden"}
        ></div>

        <div className="menu">
          <button className="menu-button" onClick={handleMenu}>
            <span>MOVIES</span>
            <img src={arrow} alt="" />
          </button>
        </div>

        {openMenu && (
          <ul>
            <div>
              <li onClick={handleGenreOpenDropdown}>
                Movies By Genre
                {/*   <img src={arrow} alt="" /> */}
              </li>

              {openDropdown && (
                <div onClick={handleMenu} className="genre-links">
                  <NavbarLinks />
                </div>
              )}

              <li onClick={handleMenu}>
                <NavLink to="/movies/top-rated">Top rated</NavLink>
                {/*    <img src={arrow} alt="" /> */}
              </li>

              <li onClick={handleMenu}>
                <NavLink to="/movies/most-popular">Most popular</NavLink>
                {/*    <img src={arrow} alt="" /> */}
              </li>

              <li onClick={handleMenu}>
                <NavLink to="/movies/latest">Latest movies</NavLink>
                {/*    <img src={arrow} alt="" /> */}
              </li>
              <div
                className={
                  openDropdown ? "close-btn-wrapper-lw" : "close-btn-wrapper"
                }
              >
                <button className="close-button" onClick={handleMenu}>
                  <span>Close (X)</span>
                </button>
              </div>
            </div>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
