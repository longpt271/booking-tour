import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import './myBasicForm.scss';
import ApiContext from 'context/ApiContext';

const ListCategories = ({ selectedItems, handleSelect, handleRef }) => {
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
        setOptionList(
          data.categories.map(option => {
            return {
              value: option._id,
              label: option.name,
            };
          })
        );
      })
      .catch(err => console.log(err));
  }, [requests.getAllCategories]);

  return (
    <div className="formInput">
      <label htmlFor="categories">Categories</label>
      <Select
        options={optionList}
        placeholder="Select categories"
        value={selectedItems}
        onChange={handleSelect}
        ref={handleRef}
        isSearchable={true}
        isMulti
      />
    </div>
  );
};

export default ListCategories;
