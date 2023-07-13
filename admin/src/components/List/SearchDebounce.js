import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchDebounce = ({
  enteredSearch,
  onSetEnteredSearch,
  onSetPageNumber,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState(enteredSearch);
  const [prevDebouncedSearchTerm, setPrevDebouncedSearchTerm] = useState('');
  const searchChangeHandler = e => setSearchTerm(e.target.value); // state input change handler

  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // set debounce time 1000ms

  useEffect(() => {
    if (debouncedSearchTerm[0] !== prevDebouncedSearchTerm) {
      setPrevDebouncedSearchTerm(debouncedSearchTerm[0]);
      onSetPageNumber(1);
      onSetEnteredSearch(debouncedSearchTerm[0]); // call onSetEnteredSearch after the search term has been debounced
    }
  }, [
    debouncedSearchTerm,
    prevDebouncedSearchTerm,
    onSetEnteredSearch,
    onSetPageNumber,
  ]);

  return (
    <input
      className="me-2 py-1 px-2 small"
      style={{ border: '1px solid #ccc', borderRadius: '4px' }}
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={searchChangeHandler}
    />
  );
};

export default SearchDebounce;
