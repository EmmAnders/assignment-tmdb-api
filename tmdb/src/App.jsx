import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContextProvider from "./contexts/Context";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage.jsx";
import MostPopularMoviesPage from "./pages/MostPopularMoviesPage.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import LatestMoviesPage from "./pages/LatestMoviesPage";

import "./App.scss";

function App() {
  return (
    <ContextProvider>
      <Navbar />

      <main className="site-container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/movies/latest">
            <LatestMoviesPage />
          </Route>

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
      </main>
    </ContextProvider>
  );
}

export default App;
