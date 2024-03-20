import React from 'react';
import './MoviesListHeader.css';
const MoviesListHeader = ({ handleSearch, switchTabs, tab }) => {
  return (
    <header className="list-header">
      <nav className="header-nav">
        <button
          className={`nav-tab ${tab ? 'active' : ''}`}
          onClick={(e) => switchTabs(e)}
          disabled={tab}
        >
          Search
        </button>
        <button
          className={`nav-tab ${!tab ? 'active' : ''}`}
          onClick={(e) => switchTabs(e)}
          disabled={!tab}
        >
          Rated
        </button>
      </nav>
      {tab ? (
        <input
          type="search"
          id="search"
          className="search-input"
          placeholder="Type to search..."
          aria-label="Type to search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      ) : (
        ''
      )}
    </header>
  );
};

export default MoviesListHeader;
