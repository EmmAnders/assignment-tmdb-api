import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../contexts/Context";

import { gsap } from "gsap";

import "../../assets/scss/components/navigation/SiteNavigation.scss";
import SiteNavigationChildren from "./SiteNavigationChildren";

import ArrowRight from "../fragments/ArrowRight";

const SiteNavigationLinks = (props) => {
  const { handleMenu, isExpanded } = useContext(Context);
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

  const elements = useRef(null);
  elements.current = [];

  const addToRefs = (el) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
    }
  };

  const mouseEnter = () => {
    gsap.to(elements.current, { x: 5, ease: "Ease.In" });
  };

  const mouseLeave = () => {
    gsap.to(elements.current, { x: 0, ease: "Ease.In" });
  };

  useEffect(() => {
    /*  console.log(elements.current); */
  });

  const handleOpenSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  return (
    <>
      {siteLinks.map((link, i) => (
        <li
          /*     onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave} */
          key={i}
          className="site-navigation-link"
        >
          <NavLink onClick={handleMenu} to={link.to}>
            {link.name}
          </NavLink>
          <ArrowRight svgRef={addToRefs} />
        </li>
      ))}

      <li onClick={handleOpenSubmenu} className="site-navigation-link ">
        <p onClick={handleOpenSubmenu}>movies by genre</p>
        <ArrowRight svgRef={addToRefs} />
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
