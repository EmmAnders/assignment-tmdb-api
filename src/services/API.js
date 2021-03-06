import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const get = async (endpoint) => {
  const results = await axios.get(endpoint);
  return results.data;
};

export const getAllGenres = async () => {
  return get(
    "genre/movie/list?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US"
  );
};

export const getMoviesByGenreId = async ({ queryKey }) => {
  const [_key, { param = null, id }] = queryKey;
  return get(
    `/discover/movie?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${param}&with_genres=${id}&with_watch_monetization_types=flatrate`
  );
};

export const getTopRatedMovies = async ({ queryKey }) => {
  const [_key, { param = null }] = queryKey;
  return get(
    `movie/top_rated?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&page=${param}`
  );
};

export const getMostPopularMovies = async ({ queryKey }) => {
  const [_key, { param = null }] = queryKey;
  return get(
    `/movie/popular?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&page=${param}`
  );
};

export const getLatestMovies = async ({ queryKey }) => {
  const [_key, { param = null }] = queryKey;
  return get(
    `/movie/now_playing?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&page=${param}`
  );
};

export const getMovieDetails = async (id) => {
  return get(
    `movie/${id}?api_key=feda2f277ecb42f240ac1d6088e4c0e2&append_to_response=credits`
  );
};

export const getSimiliarMovies = async (id) => {
  return get(
    `movie/${id}/similar?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&page=1`
  );
};

export const getMoviesByActorId = async (id) => {
  return get(
    `discover/movie?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_people=${id}&with_watch_monetization_types=flatrate`
  );
};

export const getActorProfileById = async (id) => {
  return get(
    `/person/${id}?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US`
  );
};

export const search = async (searchQuery = null) => {
  return get(
    `search/movie?api_key=feda2f277ecb42f240ac1d6088e4c0e2&language=en-US&page=1&query=${searchQuery}`
  );
};
