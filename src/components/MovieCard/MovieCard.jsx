import React from 'react';
import './MovieCard.css';
import { format } from 'date-fns';
import { Rate } from 'antd';
const MovieCard = ({ movie, token, genres, key }) => {
  const rateMovie = async (rating) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/rating?guest_session_id=${sessionStorage.getItem('guestKey')}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: `{"value":${rating}}`,
      },
    )
      .then(() => {
        sessionStorage.setItem(`movie-${movie.id}-rating`, rating);
      })
      .catch((err) => console.error(err));
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    const words = text.split(' ');
    let truncatedText = '';

    for (let i = 0; i < words.length; i++) {
      if ((truncatedText + words[i]).length <= maxLength) {
        truncatedText += words[i] + ' ';
      } else {
        break;
      }
    }

    return truncatedText.trim() + '...';
  }

  function adjustFontSize(text, maxLength) {
    if (text.length <= maxLength) {
      return 'normal-font-size';
    } else if (text.length <= maxLength * 1.5) {
      return 'small-font-size';
    } else {
      return 'very-small-font-size';
    }
  }

  let releaseDate = null;
  if (movie.release_date) {
    const dateArr = movie.release_date.split('-');
    const year = parseInt(dateArr[0], 10);
    const month = parseInt(dateArr[1], 10) - 1;
    const day = parseInt(dateArr[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const dateObj = new Date(year, month, day);
      if (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month &&
        dateObj.getDate() === day
      ) {
        releaseDate = dateObj;
      }
    }
  }

  const switchColor = (rating) => {
    switch (true) {
      case rating > 7:
        return 'green';
      case rating > 5:
        return 'yellow';
      case rating > 3:
        return 'orange';
      default:
        return 'red';
    }
  };

  return (
    <article className="movie-card" key={key}>
      <div className="movie-card-content">
        <div className="movie-card-layout">
          <div className="movie-poster-container">
            <img
              src={
                movie.poster_path
                  ? 'https://image.tmdb.org/t/p/w185' + movie.poster_path
                  : window.location.origin + '/src/assets/noroot.png'
              }
              alt="Movie poster"
              className="movie-poster"
            />
          </div>
          <div className="movie-details-container">
            <div className="movie-details">
              <div className="movie-header-mobile">
                <div className="movie-poster-container-mobile">
                  <img
                    src={
                      movie.poster_path
                        ? 'https://image.tmdb.org/t/p/w185' + movie.poster_path
                        : window.location.origin + '/src/assets/noroot.png'
                    }
                    alt="Movie poster"
                    className="movie-poster"
                  />
                </div>
                <div className="movie-header-mobile-right">
                  <header className="movie-header">
                    <h2
                      className={`movie-title ${adjustFontSize(movie.title, 28)}`}
                    >
                      {movie.title}
                    </h2>
                    <div
                      className={`movie-rating ${switchColor(movie.vote_average)}`}
                    >
                      {movie.vote_average.toString().slice(0, 3)}
                    </div>
                  </header>
                  {releaseDate && (
                    <div className="movie-release-date">
                      {format(releaseDate, 'MMMM d, yyyy')}
                    </div>
                  )}
                  <div
                    className={`movie-genres ${movie.genre_ids.length > 3 ? 'small' : ''}`}
                  >
                    {movie.genre_ids.map((id) => (
                      <div className="movie-genre">
                        {genres.find((genre) => genre.id === id).name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="movie-description">
                {truncateText(movie.overview, 150)}
              </p>
              <Rate
                count={10}
                defaultValue={
                  sessionStorage.getItem(`movie-${movie.id}-rating`) || 0
                }
                onChange={(value) => rateMovie(value)}
                className="movie-stars"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
