import { Form } from 'react-bootstrap';

const TourSort = ({ onSetPriceOrder, onSetNameOrder }) => {
  // xử lý giá trị gán state cha
  const handleChangeSort = e => {
    switch (e.target.value) {
      case 'n-asc':
        onSetNameOrder('asc');
        onSetPriceOrder('');
        break;
      case 'n-desc':
        onSetNameOrder('desc');
        onSetPriceOrder('');
        break;
      case 'p-desc':
        onSetNameOrder('');
        onSetPriceOrder('desc');
        break;
      case 'p-asc':
        onSetNameOrder('');
        onSetPriceOrder('asc');
        break;
      default:
        onSetNameOrder('');
        onSetPriceOrder('');
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
      <option value="p-asc">Price Ascending</option>
      <option value="p-desc">Price Descending</option>
    </Form.Select>
  );
};

export default TourSort;
