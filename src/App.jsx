import React, { useContext, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

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
import "./App.scss";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/movies/search", name: "Search", Component: Search },
  { path: "/movies/latest", name: "Latest", Component: MoviesLatest },
  { path: "/movies/top-rated", name: "Top rated", Component: MoviesTopRated },
  {
    path: "/movies/most-popular",
    name: "Most popular",
    Component: MoviesPopular,
  },
  {
    path: "/movies/genre/:name/:id",
    name: "Movies By Genre",
    Component: MoviesByGenrePage,
  },
  { path: "/movies/:id", name: "Movie Page", Component: MoviePage },

  { path: "/movies/actor/:id", name: "Actor Page", Component: ActorPage },
];

function App() {
  const location = useLocation();

  return (
    <div>
      <header>
        <SiteNavigation />
      </header>
      <main className="site-container">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                <div>
                  <Component />
                </div>
              </Route>
            ))}
          </Switch>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
