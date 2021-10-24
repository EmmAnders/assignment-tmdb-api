import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { Context } from "../../contexts/Context";
import SiteNavigationLinks from "./SiteNavigationLinks";
import SearchInput from "../navigation/SearchInput";

import "../../assets/scss/components/navigation/SiteNavigation.scss";

const SiteNavigation = () => {
  const { handleMenu, isExpanded, openSearch, handleSearch } = useContext(
    Context
  );

  return (
    <>
      <nav className="site-navigation">
        <div className="site-navigation-controls">
          <button
            className={isExpanded ? "expanded-menu-color" : ""}
            onClick={handleMenu}
          >
            MOVIES
          </button>
          <button
            onClick={handleSearch}
            className={isExpanded ? "expanded-menu-color" : ""}
          >
            SEARCH
          </button>
        </div>

        {isExpanded && (
          <>
            <ul className="site-navigation-dropdown ">
              <SiteNavigationLinks />
            </ul>

            <div
              onClick={handleMenu}
              className={isExpanded ? "site-navigation-overlay_show" : ""}
            ></div>
          </>
        )}

        {openSearch && <SearchInput />}
      </nav>
    </>
  );
};

export default SiteNavigation;
