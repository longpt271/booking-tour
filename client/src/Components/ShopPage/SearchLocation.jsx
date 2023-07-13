import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const SearchLocation = ({ selectedItems, handleSelect }) => {
  const getAllLocations = useSelector(state => state.api.getAllLocations);

  // lấy data từ api
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // get Api
    fetch(getAllLocations, {
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
  }, [getAllLocations]);

  return (
    <div style={{ fontSize: '13px' }}>
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
