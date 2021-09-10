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
            <NavLink
              key={genre.id}
              to={`/movies/genre/${genre.name.toLowerCase()}/${genre.id}`}
            >
              {genre.name}
            </NavLink>
          ))}
        </>
      )}
    </>
  );
};

export default NavbarLinks;
