import React, { useState, useEffect, useContext } from "react";

import { motion } from "framer-motion";
import { stagger } from "../animation/animation.js";

import Noise from "../../assets/filters/Noise.svg";

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
      <motion.nav
        initial={false}
        animate={isExpanded ? "open" : "closed"}
        className="site-navigation"
      >
        <div className="site-navigation-controls">
          <button
            className={isExpanded ? "expanded-menu-color" : ""}
            onClick={handleMenu}
          >
            MENU
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
            <motion.ul variants={stagger} className="site-navigation-dropdown">
              <SiteNavigationLinks />
            </motion.ul>

            <div
              onClick={handleMenu}
              className={isExpanded ? "site-navigation-overlay_show" : ""}
            ></div>
          </>
        )}

        {openSearch && <SearchInput />}
      </motion.nav>
    </>
  );
};

export default SiteNavigation;
