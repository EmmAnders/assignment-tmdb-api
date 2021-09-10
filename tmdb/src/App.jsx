import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage.jsx";
import MostPopularMoviesPage from "./pages/MostPopularMoviesPage.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";

import "./App.scss";

function App() {
  return (
    <div className="site-wrapper">
      <div class="app">
        <Navbar />
        <Switch>
          <Route exact path="/movies/top-rated">
            <TopRatedMoviesPage />
          </Route>

          <Route exact path="/movies/most-popular">
            <MostPopularMoviesPage />
          </Route>

          <Route exact path="/movies/genre/:name/:id">
            <MoviesByGenrePage />
          </Route>

          <Route exact path="/movies/:id">
            <MoviePage />
          </Route>

          <Route exact path="/movies/actor/:id">
            <ActorPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
