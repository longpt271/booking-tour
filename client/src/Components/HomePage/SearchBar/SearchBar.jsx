import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faPerson,
  faClock,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();

  const [enteredName, setEnteredName] = useState('');
  const [enteredCount, setEnteredCount] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const isEmpty = enteredCount === '';
  const countStyle = {
    width: isEmpty
      ? ''
      : enteredCount < 10
      ? '10px'
      : enteredCount < 100
      ? '20px'
      : '30px',
  };
  const selectStyle = { color: selectedTime === '' ? '#ccc' : '#000' };

  const handleSearch = () => {
    const searchUrl = `/shop?page=1&name=${enteredName}&&time=${selectedTime}&&count=${enteredCount}`;
    navigate(searchUrl);
  };

  return (
    <div id="search-bar" className="headerSearch">
      <div className="headerSearchItem searchBarCity">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
          type="text"
          placeholder="Tìm điểm đến"
          className="headerSearchInput"
          value={enteredName}
          onChange={e => setEnteredName(e.target.value)}
        />
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <input
          type="number"
          placeholder="Số người sẽ đi"
          min="1"
          className="headerSearchInput"
          style={countStyle}
          value={enteredCount}
          onChange={e => setEnteredCount(e.target.value)}
        />
        {!isEmpty && <span> người</span>}
      </div>

      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faClock} className="headerIcon" />
        <select
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
          style={selectStyle}
        >
          <option value="">Thời gian</option>
          <option value="1-3"> 1-3 ngày</option>
          <option value="4-7"> 4-7 ngày</option>
          <option value="8-14"> 8-14 ngày</option>
          <option value="15-30"> Trên 15 ngày</option>
        </select>
      </div>

      <div className="headerSearchItem searchBarBtn" onClick={handleSearch}>
        <FontAwesomeIcon
          className="d-none d-lg-block"
          icon={faMagnifyingGlass}
        />
        <span className="d-block d-lg-none">Search</span>
      </div>
    </div>
  );
};

export default SearchBar;
