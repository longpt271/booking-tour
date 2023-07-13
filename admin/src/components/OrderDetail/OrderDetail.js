import ApiContext from 'context/ApiContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import classes from './OrderDetail.module.css';

const formattedDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11), nên cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // trả về Định dạng thành chuỗi "dd/mm/yyyy"
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api
  const [order, setOrder] = useState({});

  const urlFetch = requests.getOrder;

  useEffect(() => {
    fetch(urlFetch + '/' + orderId, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        data.order && setOrder(data.order);
        window.scrollTo(0, 0);
      })
      .catch(err => console.log(err));
  }, [urlFetch, orderId]);

  const status = (() => {
    if (order.status === 'waiting') {
      return <b className="text-warning">Đang trong tour</b>;
    } else if (order.status === 'done') {
      return (
        <b className="text-success">
          Đã hoàn thành
          <CheckCircleIcon className="ms-1 mb-1" style={{ width: '15px' }} />
        </b>
      );
    } else if (order.status === 'cancelled') {
      return <b className="text-danger">Đã hủy</b>;
    }
    return null;
  })();

  return (
    <div className="dataTable text-gray">
      <div className="fw-bold shadow-none p-3 mb-3 bg-light rounded">
        <span className="text-capitalize">Orders Detail </span>
        <span className="text-muted">{order._id}</span>
      </div>

      {Object.keys(order).length !== 0 && (
        <div className="row gx-0">
          <div className="d-flex justify-content-between mb-4">
            <div className="small">
              <p className="mb-2">
                Email: <b>{order.userInfo.email}</b>
              </p>
              <p className="mb-2">
                FullName: <b>{order.userInfo.fullName}</b>
              </p>
              <p className="mb-2">
                Phone: <b>{order.userInfo.phone}</b>
              </p>
            </div>

            <div className="text-end">
              <p className="mb-2">{status}</p>
              <p className="small mb-2">
                Ngày đặt: <b>{formattedDate(order.createdAt)}</b>
              </p>
              <div className="mb-2">
                <span className="me-2">
                  (
                  {order.isPay ? (
                    <b className="text-success">Đã thanh toán</b>
                  ) : (
                    <b className="text-warning">Chưa thanh toán</b>
                  )}
                  )
                </span>
                <b>{order.totalMoney.toLocaleString('vi-VN')}đ</b>
              </div>
            </div>
          </div>

          <table className={classes.order}>
            <thead className="bg-light">
              <tr>
                <th>ID TOUR</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>LOCATION START</th>
                <th>TIME</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {order.tours.map(t => {
                const tourId = t.tour._id ? t.tour._id._id : 'unknown id';
                const tourImg = t.tour._id ? t.tour._id.img1 : '';
                return (
                  <tr key={Math.random()}>
                    <td className="small fw-bold">{tourId}</td>
                    <td className="small fw-bold">
                      <img
                        src={tourImg}
                        alt={t.tour.name}
                        className="rounded"
                        width="150"
                        height="100"
                      />
                    </td>
                    <td className="small fw-bold">{t.tour.name}</td>
                    <td className="small fw-bold">{t.tour.locationStart}</td>
                    <td className="small fw-bold">
                      <span>{formattedDate(t.startDate)} -</span>
                      <span> {formattedDate(t.endDate)}</span>
                    </td>
                    <td className="small fw-bold">
                      <div className="d-flex flex-column">
                        {t.adultQuantity !== 0 && (
                          <div className="d-flex justify-content-between">
                            <span>Người lớn:</span>
                            <span className="text-secondary">
                              {t.tour.adultPrice.toLocaleString('vi-VN')}đ x
                              {t.adultQuantity}
                            </span>
                          </div>
                        )}
                        {t.childQuantity !== 0 && (
                          <div className="d-flex justify-content-between">
                            <span>Trẻ em:</span>
                            <span className="text-secondary">
                              {t.tour.childPrice.toLocaleString('vi-VN')}đ x
                              {t.childQuantity}
                            </span>
                          </div>
                        )}
                        {t.babyQuantity !== 0 && (
                          <div className="d-flex justify-content-between">
                            <span>Em bé:</span>
                            <span className="text-secondary">
                              {t.tour.babyPrice.toLocaleString('vi-VN')}đ x
                              {t.babyQuantity}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {Object.keys(order).length === 0 && <div>Order này không tồn tại</div>}
    </div>
  );
};

export default OrderDetail;
