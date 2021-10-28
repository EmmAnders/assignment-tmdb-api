import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../contexts/Context";

import { motion } from "framer-motion";
import { iconHoverRight } from "../animation/animation.js";

import "../../assets/scss/components/navigation/SiteNavigation.scss";
import SiteNavigationChildren from "./SiteNavigationChildren";

import ArrowRight from "../fragments/ArrowRight";

const SiteNavigationLinks = (props) => {
  const { handleMenu } = useContext(Context);
  const siteLinks = [
    {
      to: "/",
      name: "home",
    },
    {
      to: "/movies/most-popular",
      name: "most popular",
    },
    {
      to: "/movies/latest",
      name: "latest",
    },
    {
      to: "/movies/top-rated",
      name: "top rated",
    },
  ];

  const [openSubmenu, setOpenSubmenu] = useState(false);

  const handleOpenSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  return (
    <>
      {siteLinks.map((link, i) => (
        <motion.li
          key={i}
          className="site-navigation-link"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <NavLink onClick={handleMenu} to={link.to} exact>
            {link.name}
          </NavLink>

          <ArrowRight variants={iconHoverRight} />
        </motion.li>
      ))}

      <li onClick={handleOpenSubmenu} className="site-navigation-link ">
        <p onClick={handleOpenSubmenu}>movies by genre</p>
        <ArrowRight />
      </li>

      {openSubmenu && (
        <div className="site-navigation-link-submenu">
          <SiteNavigationChildren />
        </div>
      )}
    </>
  );
};

export default SiteNavigationLinks;
