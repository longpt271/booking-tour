import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';

import classes from './OrderItem.module.css';

const OrderItem = ({ order }) => {
  const isPay =
    order.isPay === false ? (
      <b className="text-warning">Chưa thanh toán</b>
    ) : order.isPay === true ? (
      <span className="text-success">
        Đã thanh toán
        <FontAwesomeIcon icon={faCircleCheck} className="ms-1" />
      </span>
    ) : (
      ''
    );
  const status = (() => {
    if (order.status === 'waiting') {
      return <b className="text-warning">Đang trong tour</b>;
    } else if (order.status === 'done') {
      return (
        <span className="text-success">
          Đã hoàn thành
          <FontAwesomeIcon icon={faCircleCheck} className="ms-1" />
        </span>
      );
    } else if (order.status === 'cancelled') {
      return <b className="text-danger">Đã hủy</b>;
    }
    return null;
  })();

  return (
    <tr>
      <td className="small text-start overflow-hidden">{order._id}</td>
      <td className="small overflow-hidden">
        {order.tours.length} {order.tours.length > 1 ? 'tours' : 'tour'}
      </td>
      <td className="small">{order.totalMoney.toLocaleString('vi-VN')}đ</td>
      <td className="small">{isPay}</td>
      <td className="small">{status}</td>
      <td>
        <Link
          to={'/order/' + order._id}
          className={`${classes.DetailOrderBtn} small active-animation`}
        >
          View
          <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-2" />
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
