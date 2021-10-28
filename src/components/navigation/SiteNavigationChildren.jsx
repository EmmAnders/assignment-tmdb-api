import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllGenres } from "../../services/API";
import { Context } from "../../contexts/Context";

const SiteNavigationChildren = (props) => {
  const { handleMenu, isExpanded } = useContext(Context);
  const { data, error, isError, isLoading } = useQuery("genres", getAllGenres);
  return (
    <>
      {data?.genres && (
        <>
          {data.genres.map((genre, i) => (
            <li key={genre.id}>
              <NavLink
                onClick={handleMenu}
                to={`/movies/genre/${genre.name.toLowerCase()}/${genre.id}`}
                exact
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

export default SiteNavigationChildren;
