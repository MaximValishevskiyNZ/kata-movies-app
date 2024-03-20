import React, { useContext, useState } from 'react';
import './MoviesList.css';
import MovieCard from '../MovieCard/MovieCard.jsx';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Pagination } from 'antd';
import MoviesListHeader from '../MoviesListHeader/MoviesListHeader.jsx';
import { GenresContext } from '../../GenresContext.jsx';

const MoviesList = ({
  movies,
  handleSearch,
  isSuccessful,
  isLoading,
  page,
  handlePageChange,
  totalPages,
  token,
  ratedMovies,
  pageRated,
  totalPagesRated,
  fetchRated,
  handlePageChangeRated,
}) => {
  const [tab, setTab] = useState(true);
  const { genres } = useContext(GenresContext);
  const switchTabs = () => {
    setTab(!tab);
    if (tab) {
      fetchRated(1);
    }
  };

  return (
    <>
      <MoviesListHeader
        handleSearch={handleSearch}
        switchTabs={switchTabs}
        tab={tab}
      />
      {tab ? (
        isLoading ? (
          <div className="loading-container">
            <LoadingOutlined />
          </div>
        ) : isSuccessful ? (
          <>
            <div className="movies-list">
              {movies.map((movie) => (
                <MovieCard
                  movie={movie}
                  token={token}
                  genres={genres}
                  key={movie.id}
                />
              ))}
            </div>
            {totalPages > 1 ? (
              <Pagination
                current={page}
                onChange={handlePageChange}
                total={totalPages}
                showSizeChanger={false}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          <Alert
            message="No results found!"
            description="Please try another search query."
            type="warning"
          />
        )
      ) : ratedMovies ? (
        <>
          <div className="movies-list">
            {ratedMovies.map((movie) => (
              <MovieCard
                movie={movie}
                token={token}
                genres={genres}
                key={movie.id}
              />
            ))}
          </div>
          {totalPagesRated * 10 > 10 ? (
            <Pagination
              current={pageRated}
              onChange={handlePageChangeRated}
              total={totalPagesRated * 10}
              showSizeChanger={false}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <Alert description="No rated movies yet." type="warning" />
      )}
    </>
  );
};

export default MoviesList;
