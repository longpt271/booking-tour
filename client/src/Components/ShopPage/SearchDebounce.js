import { useEffect, useState } from 'react';

import classes from './SearchDebounce.module.css';
import { useDebounce } from 'hooks/use-debounce';

const SearchDebounce = ({
  enteredSearch,
  onSetEnteredSearch,
  onSetPageNumber,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState(enteredSearch);
  const [prevDebouncedSearchTerm, setPrevDebouncedSearchTerm] = useState('');
  const searchChangeHandler = e => setSearchTerm(e.target.value); // state input change handler

  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // set debounce time 1000ms

  useEffect(() => {
    if (debouncedSearchTerm !== prevDebouncedSearchTerm) {
      setPrevDebouncedSearchTerm(debouncedSearchTerm);
      onSetPageNumber(1);
      onSetEnteredSearch(debouncedSearchTerm); // call onSetEnteredSearch after the search term has been debounced
    }
  }, [
    debouncedSearchTerm,
    prevDebouncedSearchTerm,
    onSetEnteredSearch,
    onSetPageNumber,
  ]);

  return (
    <input
      type={props.type}
      className={`${classes.input} mb-1 mb-md-0 ${props.className}`}
      placeholder={props.placeholder}
      min={props.min ? props.min : null} // sử dụng nếu type='number'
      step={props.step ? props.step : null} // sử dụng nếu type='number'
      value={searchTerm}
      onChange={searchChangeHandler}
    />
  );
};

export default SearchDebounce;
