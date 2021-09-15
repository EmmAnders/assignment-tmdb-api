import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllGenres } from "../services/API";

import "../scss/components/Navbar.scss";

const NavbarLinks = (props) => {
  const { data, error, isError, isLoading } = useQuery("genres", getAllGenres);

  return (
    <>
      {data?.genres && (
        <>
          {data.genres.map((genre, i) => (
            <li key={genre.id}>
              <NavLink
                to={`/movies/genre/${genre.name.toLowerCase()}/${genre.id}`}
              >
                {genre.name}
              </NavLink>
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default NavbarLinks;
