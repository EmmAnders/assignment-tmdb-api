import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context } from "./contexts/Context";
import { search } from "./services/API";
import { useQuery } from "react-query";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviesTopRated from "./pages/MoviesTopRated.jsx";
import MoviesPopular from "./pages/MoviesPopular.jsx";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import MoviesLatest from "./pages/MoviesLatest";
import Search from "./components/Search";
import Card from "./components/Card";

import "./App.scss";

function App() {
  const { searchQuery, openSearch, handleClickToMovieId } = useContext(Context);

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
      <header>
        <Navbar />
        {openSearch && <Search />}
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
