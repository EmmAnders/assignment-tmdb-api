import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllGenres } from "../services/API";

const NavbarLinks = (props) => {
  const { data, error, isError, isLoading } = useQuery("genres", getAllGenres);

  return (
    <>
      {data?.genres && (
        <>
          {data.genres.map((genre, i) => (
            <li key={i}>
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
