import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Search = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() !== '') {
      onSubmit(query);
    }
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <>
      <header className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
