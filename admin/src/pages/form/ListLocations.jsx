import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import './myBasicForm.scss';
import ApiContext from 'context/ApiContext';

const ListLocations = ({ selectedItems, handleSelect, handleRef }) => {
  const { requests } = useContext(ApiContext);

  // lấy data từ api
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // get Api
    fetch(requests.getAllLocations, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setOptionList(
          data.locations.map(option => {
            return {
              value: option._id,
              label: option.name,
            };
          })
        );
      })
      .catch(err => console.log(err));
  }, [requests.getAllLocations]);

  return (
    <div className="formInput">
      <label htmlFor="locations">Locations</label>
      <Select
        options={optionList}
        placeholder="Select locations"
        value={selectedItems}
        onChange={handleSelect}
        ref={handleRef}
        isSearchable={true}
        isMulti
      />
    </div>
  );
};

export default ListLocations;
