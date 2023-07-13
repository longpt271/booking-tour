import React, { useState } from 'react';
import classes from './SearchBtn.module.css';

const SearchTime = ({ handlerChange }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = value => {
    if (activeButton === value) {
      setActiveButton(null); // Xóa giá trị active nếu nút được click lại
      handlerChange(''); // Gọi hàm handlerChange với giá trị rỗng
    } else {
      setActiveButton(value);
      handlerChange(value);
    }
  };

  return (
    <div className="row g-2">
      <div className="col-6">
        <button
          type="button"
          className={`btn w-100 ${classes.btnSearch} ${
            activeButton === '1-3' ? classes.btnActive : ''
          }`}
          onClick={() => handleButtonClick('1-3')}
        >
          1-3 ngày
        </button>
      </div>
      <div className="col-6">
        <button
          type="button"
          className={`btn w-100 ${classes.btnSearch} ${
            activeButton === '4-7' ? classes.btnActive : ''
          }`}
          onClick={() => handleButtonClick('4-7')}
        >
          4-7 ngày
        </button>
      </div>
      <div className="col-6">
        <button
          type="button"
          className={`btn w-100 ${classes.btnSearch} ${
            activeButton === '8-14' ? classes.btnActive : ''
          }`}
          onClick={() => handleButtonClick('8-14')}
        >
          8-14 ngày
        </button>
      </div>
      <div className="col-6">
        <button
          type="button"
          className={`btn w-100 ${classes.btnSearch} ${
            activeButton === '15-30' ? classes.btnActive : ''
          }`}
          onClick={() => handleButtonClick('15-30')}
        >
          trên 15 ngày
        </button>
      </div>
    </div>
  );
};

export default SearchTime;
