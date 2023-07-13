import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const SearchCategory = ({ selectedItems, handleSelect }) => {
  const getAllCategories = useSelector(state => state.api.getAllCategories);

  // lấy data từ api
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // get Api
    fetch(getAllCategories, {
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
  }, [getAllCategories]);

  return (
    <div style={{ fontSize: '13px' }}>
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
