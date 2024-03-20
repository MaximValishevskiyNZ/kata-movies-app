import './App.css';
import MoviesList from './components/MoviesList/MoviesList.jsx';
import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { GenresProvider } from './GenresContext.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRated, setPageRated] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [totalPagesRated, setTotalpagesRated] = useState(0);
  const [search, setSearch] = useState('');
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTRhNzExZjk0OGIyM2FkM2VlOThkOTUzYmZmYzkzNyIsInN1YiI6IjY1ZjIwMGQxZTlkYTY5MDEzMDVlNjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B0W3SK6j3uW5bSPvaCHV9PRXR9mUlT9IcjAHyE54Lqk';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  async function fetchMovies(searchValue, pageQuery) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${pageQuery}`,
        options,
      );
      const data = await response.json();
      setIsSuccessful(true);
      setTotalpages(data.total_pages);
      return data;
    } catch (error) {
      setIsSuccessful(false);
      console.error('Error fetching movies:', error);
      return { results: [] };
    }
  }

  async function fetchRated(pageQueryRated) {
    fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionStorage.getItem('guestKey')}/rated/movies?language=en-US&page=${pageQueryRated}&sort_by=created_at.asc`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setTotalpagesRated(response.total_pages);
        return setRatedMovies(response.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const fetchGuestSessionId = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/authentication/guest_session/new',
        options,
      );
      const data = await response.json();
      setGuestSessionId(data.guest_session_id);
      if (!sessionStorage.getItem('guestKey')) {
        sessionStorage.setItem('guestKey', data.guest_session_id);
      }
    };

    fetchGuestSessionId();
  }, []);

  const handleSearch = debounce(async (searchValue) => {
    if (!/^\s*$/.test(searchValue)) {
      setIsLoading(true);
      const moviesData = await fetchMovies(searchValue, 1);
      if (moviesData.results.length === 0) {
        setIsSuccessful(false);
      } else {
        setIsSuccessful(true);
        setMovies(moviesData.results);
        setSearch(searchValue);
      }
      setIsLoading(false);
    }
  }, 500);

  const handlePageChange = async (newPage) => {
    setIsLoading(true);
    const moviesData = await fetchMovies(search, newPage);
    setMovies(moviesData.results);
    setPage(newPage);
    setIsLoading(false);
  };

  const handlePageChangeRated = async (newPage) => {
    setIsLoading(true);
    fetchRated(newPage);
    setPageRated(newPage);
    setIsLoading(false);
  };

  return (
    <>
      <GenresProvider>
        <div className="app-container">
          <MoviesList
            movies={movies}
            handleSearch={handleSearch}
            isSuccessful={isSuccessful}
            isLoading={isLoading}
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            token={token}
            ratedMovies={ratedMovies}
            pageRated={pageRated}
            totalPagesRated={totalPagesRated}
            fetchRated={fetchRated}
            handlePageChangeRated={handlePageChangeRated}
          />
        </div>
      </GenresProvider>
    </>
  );
}

export default App;
