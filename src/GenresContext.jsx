import React, { createContext, useState, useEffect } from 'react';

export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTRhNzExZjk0OGIyM2FkM2VlOThkOTUzYmZmYzkzNyIsInN1YiI6IjY1ZjIwMGQxZTlkYTY5MDEzMDVlNjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B0W3SK6j3uW5bSPvaCHV9PRXR9mUlT9IcjAHyE54Lqk',
        },
      };

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=en',
          options,
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={{ genres }}>
      {children}
    </GenresContext.Provider>
  );
};
