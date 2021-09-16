import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Context } from "./contexts/Context";
import { search } from "./services/API";
import { useQuery } from "react-query";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage.jsx";
import MostPopularMoviesPage from "./pages/MostPopularMoviesPage.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import LatestMoviesPage from "./pages/LatestMoviesPage";
import Search from "./components/Search";
import Card from "./components/Card";

import "./App.scss";

function App() {
  const { searchQuery } = useContext(Context);

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["search-movies", searchQuery],
    () => {
      if (searchQuery) {
        return search(searchQuery);
      }
    },
    {
      keepPreviousData: true,
    }
  );
  return (
    <>
      <Navbar />
      <Search />
      {!searchQuery ? (
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
      ) : (
        <section className="movies-page-container">
          <section className="page-content">
            {data?.results.length > 0
              ? data.results.map((movie) => (
                  <React.Fragment key={movie.id}>
                    <Card
                      onClick={() => handleClickToMovieId(movie.id)}
                      src={movie.poster_path}
                      title={movie.title}
                    ></Card>
                  </React.Fragment>
                ))
              : null}
          </section>
        </section>
      )}
    </>
  );
}

export default App;