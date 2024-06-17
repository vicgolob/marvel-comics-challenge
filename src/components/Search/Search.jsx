import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import IconSearch from '@/assets/icon-search.svg';
import { useDebounce } from '@/hooks/hooks.js';
import { Context } from '@/context/CharactersContext';

import './Search.scss';

function Search({ resultsCount, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isInitialRender = useRef(true);
  const {
    isFilterActive,
    isFavoritesEmpty,
    shouldResetSearch,
    updateShouldResetSearch,
  } = useContext(Context);

  const handleChange = (event) => {
    isSearchDisabled && setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (shouldResetSearch.current) {
      setSearchTerm('');
      isInitialRender.current = true;
      updateShouldResetSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldResetSearch.current]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onSearch(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  function isSearchDisabled() {
    return isFilterActive && isFavoritesEmpty;
  }

  return (
    <>
      <div className="search-container">
        <img src={IconSearch} role="presentation" width="12px" />
        <input
          type="search"
          placeholder="SEARCH CHARACTER"
          value={searchTerm}
          onChange={handleChange}
          disabled={isSearchDisabled()}
        />
      </div>

      {resultsCount > 0 && (
        <p className="text-xs search-results-count">{resultsCount} RESULTS</p>
      )}
    </>
  );
}

export default Search;

Search.propTypes = {
  resultsCount: PropTypes.number,
  onSearch: PropTypes.func.isRequired,
};
