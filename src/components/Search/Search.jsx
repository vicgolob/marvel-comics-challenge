import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import IconSearch from '@/assets/icon-search.svg';
import { useDebounce } from '@/hooks/hooks.js';

import './Search.scss';

function Search({ resultsCount, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isInitialRender = useRef(true);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onSearch(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="search-container">
        <img src={IconSearch} role="presentation" width="12px" />
        <input
          type="search"
          placeholder="SEARCH CHARACTER"
          value={searchTerm}
          onChange={handleChange}
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
