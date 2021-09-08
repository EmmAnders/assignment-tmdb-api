import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMoviesByActorId } from "../services/API";

const ActorPage = () => {
  const { id } = useParams();

  const { data, error, isError, isLoading } = useQuery(["actor", id], () =>
    getMoviesByActorId(id)
  );

  console.log(data);

  return <div>Actor</div>;
};

export default ActorPage;
