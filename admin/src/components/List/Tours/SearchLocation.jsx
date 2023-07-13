import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import ApiContext from 'context/ApiContext';

const SearchLocation = ({ selectedItems, handleSelect }) => {
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
        setOptionList([
          { value: '', label: 'Select location' }, // Giá trị mặc định
          ...data.locations.map(option => ({
            value: option._id,
            label: option.name,
          })),
        ]);
      })
      .catch(err => console.log(err));
  }, [requests.getAllLocations]);

  return (
    <div className="me-2">
      <Select
        options={optionList}
        placeholder="Select location"
        value={selectedItems}
        onChange={handleSelect}
        isSearchable={true}
      />
    </div>
  );
};

export default SearchLocation;
