import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';

import './InputItemCart.css';
import { calcPrice } from 'utils/calcPrice';

// Hàm tính giá tour khi có discount
function calcDisPrice(discountId, price) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = discountedPrice.toLocaleString('vi-VN') + 'đ';
  return formattedPrice;
}

const InputItemCart = ({
  tourData,
  startDate,
  setStartDate,
  options,
  handleOption,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <>
      <div className="wrapFlexItem DetailFormDate">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <div style={{ position: 'relative' }}>
          <ReactDatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div className="wrapFlexItem DetailFormOption">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="optionsText text-dark"
        >{`${options.adult} adult · ${options.child} children · ${options.baby} baby`}</span>
        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span>
                {calcDisPrice(tourData.discountId, tourData.adultPrice)}
              </span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span>
                {calcDisPrice(tourData.discountId, tourData.childPrice)}
              </span>
              <div className="optionCounter">
                <button
                  disabled={options.child <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption('child', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.child}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('child', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span>
                {calcDisPrice(tourData.discountId, tourData.babyPrice)}
              </span>
              <div className="optionCounter">
                <button
                  disabled={options.baby <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption('baby', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.baby}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('baby', 'i')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputItemCart;
