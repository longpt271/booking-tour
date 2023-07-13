import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

const SearchDiscount = ({ isDiscount, handlerChange }) => {
  return (
    <div className="d-flex" style={{ fontSize: '25px', cursor: 'pointer' }}>
      {isDiscount ? (
        <FontAwesomeIcon icon={faToggleOn} onClick={() => handlerChange('')} />
      ) : (
        <FontAwesomeIcon
          icon={faToggleOff}
          onClick={() => handlerChange('yes')}
        />
      )}
    </div>
  );
};

export default SearchDiscount;
