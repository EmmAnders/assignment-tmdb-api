import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context } from "./contexts/Context";

import SiteNavigation from "./components/navigation/SiteNavigation";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MoviesTopRated from "./pages/MoviesTopRated.jsx";
import MoviesPopular from "./pages/MoviesPopular.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import MoviesLatest from "./pages/MoviesLatest";

import "./assets/scss/base/Global.scss";

function App() {
  const { searchQuery } = useContext(Context);

  return (
    <>
      <header>
        <SiteNavigation />
        {/*       {openSearch && <SearchInput />} */}
      </header>
      <main className="site-container">
        <Switch>
          <Route exact path="/movies/search">
            <Search />
          </Route>
          
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
    </>
  );
}

export default App;
