import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { Context } from "../contexts/Context";

import NavbarLinks from "./NavbarLinks";

import "../scss/components/Navbar.scss";

import arrow from "../assets/icons/arrow-right.svg";
import plus from "../assets/icons/plus.svg";
import x from "../assets/icons/x.svg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { openSearch, setOpenSearch } = useContext(Context);

  const handleMenu = () => {
    setOpenMenu(!openMenu);

    if (!openMenu) {
      document.body.classList.add("nav-open");
    }

    if (openMenu) {
      document.body.classList.remove("nav-open");
    }
  };

  const handleGenreOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleSearchbar = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <nav className={openMenu ? "mb-lg" : "mb-sm"}>
      <div
        onClick={handleMenu}
        className={openMenu ? "show-overlay" : ""}
      ></div>

      <div className="menu">
        <button className="menu-button" onClick={handleMenu}>
          <span>MOVIES</span>
        </button>

        <button onClick={handleSearchbar} className="menu-button">
          SEARCH
        </button>
      </div>

      {openMenu && (
        <ul>
          <li onClick={handleMenu}>
            <NavLink to="/">
              <p>Home</p>
              <img src={arrow} alt="arrow-right" />
            </NavLink>
          </li>
          <li className="menu-item genre" onClick={handleGenreOpenDropdown}>
            <p>Movies By Genre</p>
            <img src={plus} alt="plus" />
          </li>

          {openDropdown && (
            <div onClick={handleMenu} className="genre-links">
              <NavbarLinks />
            </div>
          )}

          <li onClick={handleMenu}>
            <NavLink to="/movies/top-rated">
              <p> Top rated</p>
              <img src={arrow} alt="arrow-right" />
            </NavLink>
          </li>

          <li onClick={handleMenu}>
            <NavLink to="/movies/most-popular">
              <p>Most popular</p>
              <img src={arrow} alt="arrow-right" />
            </NavLink>
          </li>

          <li onClick={handleMenu}>
            <NavLink to="/movies/latest">
              <p> Latest movies</p>
              <img src={arrow} alt="arrow-right" />
            </NavLink>
          </li>
          <li onClick={handleMenu} className="close-btn-wrapper">
            <p>Close</p>
            <img src={x} alt="close" />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
