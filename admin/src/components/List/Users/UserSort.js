import { Form } from 'react-bootstrap';

const UserSort = ({ onSetEmailOrder, onSetNameOrder }) => {
  // xử lý giá trị gán state cha
  const handleChangeSort = e => {
    switch (e.target.value) {
      case 'n-asc':
        onSetNameOrder('asc');
        onSetEmailOrder('');
        break;
      case 'n-desc':
        onSetNameOrder('desc');
        onSetEmailOrder('');
        break;
      case 'e-desc':
        onSetNameOrder('');
        onSetEmailOrder('desc');
        break;
      case 'e-asc':
        onSetNameOrder('');
        onSetEmailOrder('asc');
        break;
      default:
        onSetNameOrder('');
        onSetEmailOrder('');
        break;
    }
  };

  return (
    <Form.Select
      aria-label="Default select example"
      className="ms-2"
      style={{
        width: 'auto',
        fontSize: '13px',
        color: '#333',
      }}
      onChange={handleChangeSort}
    >
      <option>Default sorting</option>
      <option value="n-asc">Name Ascending</option>
      <option value="n-desc">Name Descending</option>
      <option value="e-asc">Email Ascending</option>
      <option value="e-desc">Email Descending</option>
    </Form.Select>
  );
};

export default UserSort;
