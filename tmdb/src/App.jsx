import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/movies/top-rated">
          <TopRatedMoviesPage />
        </Route>

        <Route exact path="/movies/:id">
          <MoviePage />
        </Route>

        <Route exact path="/movies/actor/:id">
          <ActorPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
