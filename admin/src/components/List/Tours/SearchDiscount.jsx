import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import ApiContext from 'context/ApiContext';

const SearchDiscount = ({ selectedItems, handleSelect }) => {
  const { requests } = useContext(ApiContext);

  // lấy data từ api
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // get Api
    fetch(requests.getAllDiscounts, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setOptionList([
          { value: '', label: 'Select discount' }, // Giá trị mặc định
          ...data.discounts.map(option => ({
            value: option._id,
            label: `${option.name} (${option.percentOff}%)`,
          })),
        ]);
      })
      .catch(err => console.log(err));
  }, [requests.getAllDiscounts]);

  return (
    <div className="me-2">
      <Select
        options={optionList}
        placeholder="Select discount"
        value={selectedItems}
        onChange={handleSelect}
        isSearchable={true}
      />
    </div>
  );
};

export default SearchDiscount;
