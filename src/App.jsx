import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context } from "./contexts/Context";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MoviesTopRated from "./pages/MoviesTopRated.jsx";
import MoviesPopular from "./pages/MoviesPopular.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import MoviesLatest from "./pages/MoviesLatest";
import SearchInput from "./components/SearchInput";
import Card from "./components/Card";

import "./App.scss";

function App() {
  const { searchQuery, openSearch, handleClickToMovieId } = useContext(Context);

  return (
    <>
      <header>
        <Navbar />
        {openSearch && <SearchInput />}
      </header>
      {!searchQuery ? (
        <main className="site-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/movies/latest">
              <MoviesLatest />
            </Route>

            <Route exact path="/movies/top-rated">
              <MoviesTopRated />
            </Route>

            <Route exact path="/movies/most-popular">
              <MoviesPopular />
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
        <Search />
      )}
    </>
  );
}

export default App;
