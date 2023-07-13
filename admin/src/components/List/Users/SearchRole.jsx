import Select from 'react-select';

const SearchRole = ({ selectedItem, handleSelect }) => {
  const optionList = [
    { value: '', label: 'Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ];

  return (
    <div className="me-2">
      <Select
        options={optionList}
        placeholder="Role"
        value={selectedItem}
        onChange={handleSelect}
        isSearchable={true}
      />
    </div>
  );
};

export default SearchRole;
