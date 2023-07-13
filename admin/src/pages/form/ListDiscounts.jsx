import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import './myBasicForm.scss';
import ApiContext from 'context/ApiContext';

const ListDiscounts = ({ selectedItems, handleSelect }) => {
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
          { value: null, label: 'Select discount' }, // Giá trị mặc định
          ...data.discounts.map(option => ({
            value: option._id,
            label: `${option.name} (${option.percentOff}%)`,
          })),
        ]);
      })
      .catch(err => {});
  }, [requests.getAllDiscounts]);

  return (
    <div className="formInput">
      <label htmlFor="discounts">Discount</label>
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

export default ListDiscounts;
