import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import ApiContext from 'context/ApiContext';

const SearchCategory = ({ selectedItems, handleSelect }) => {
  const { requests } = useContext(ApiContext);

  // lấy data từ api
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // get Api
    fetch(requests.getAllCategories, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setOptionList([
          { value: '', label: 'Select category' }, // Giá trị mặc định
          ...data.categories.map(option => ({
            value: option._id,
            label: option.name,
          })),
        ]);
      })
      .catch(err => console.log(err));
  }, [requests.getAllCategories]);

  return (
    <div className="me-2">
      <Select
        options={optionList}
        placeholder="Select category"
        value={selectedItems}
        onChange={handleSelect}
        isSearchable={true}
      />
    </div>
  );
};

export default SearchCategory;
