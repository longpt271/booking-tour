import { Form } from 'react-bootstrap';

import classes from './ShopListSort.module.css';

const ShopListSort = ({
  priceOrder,
  nameOrder,
  onSetPriceOrder,
  onSetNameOrder,
}) => {
  const valueSelect = priceOrder ? 'p-' + priceOrder : 'n-' + nameOrder;

  // xử lý giá trị gán state cha
  const handleChangeSort = e => {
    switch (e.target.value) {
      case 'p-desc':
        onSetNameOrder('');
        onSetPriceOrder('desc');
        break;
      case 'p-asc':
        onSetNameOrder('');
        onSetPriceOrder('asc');
        break;
      case 'n-asc':
        onSetPriceOrder('');
        onSetNameOrder('asc');
        break;
      case 'n-desc':
        onSetPriceOrder('');
        onSetNameOrder('desc');
        break;
      default:
        onSetPriceOrder('');
        onSetNameOrder('');
        break;
    }
  };

  return (
    <Form.Select
      aria-label="Default select example"
      className={classes.dropdown}
      value={valueSelect}
      onChange={handleChangeSort}
    >
      <option>Sắp xếp</option>
      <option value="p-asc">Theo giá bé &#8594; lớn</option>
      <option value="p-desc">Theo giá lớn &#8594; bé</option>
      <option value="n-asc">Theo tên A &#8594; Z</option>
      <option value="n-desc">Theo tên Z &#8594; A</option>
    </Form.Select>
  );
};

export default ShopListSort;
