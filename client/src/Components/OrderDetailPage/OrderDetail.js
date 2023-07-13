import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import classes from './OrderDetail.module.css';
import useHttp from 'hooks/use-http';
import { handleImgError } from 'utils/imageUtils';
import HeaderPage from 'Components/UI/HeaderPage/HeaderPage';

const formattedDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11), nên cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // trả về Định dạng thành chuỗi "dd/mm/yyyy"
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});

  const urlFetch = useSelector(state => state.api.urlOrder);

  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      data.order && setOrder(data.order);
      window.scrollTo(0, 0);
    };

    fetchData({ url: urlFetch + '/' + orderId }, transformData);
  }, [fetchData, urlFetch, orderId]);

  const status = (() => {
    if (order.status === 'waiting') {
      return <b className="text-warning">Đang trong tour</b>;
    } else if (order.status === 'done') {
      return (
        <b className="text-success">
          Đã hoàn thành
          <FontAwesomeIcon icon={faCircleCheck} className="ms-1" />
        </b>
      );
    } else if (order.status === 'cancelled') {
      return <b className="text-danger">Đã hủy</b>;
    }
    return null;
  })();

  return (
    <section>
      <HeaderPage title="Order Detail" />

      <div className="row py-5 gx-0">
        <h4 className={`${classes.titleOrder} h5 fw-bold mb-4`}>
          <span className="text-uppercase">Information order </span>
          <span className="text-muted">({order._id})</span>
        </h4>

        {Object.keys(order).length !== 0 && (
          <>
            <div className="d-md-flex justify-content-between mb-4">
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

              <div className="text-md-end">
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
                  <th>Ảnh</th>
                  <th>Tên Tour</th>
                  <th>Nơi khởi hành</th>
                  <th>Thời gian</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {order.tours.map(t => {
                  const tourId = t.tour._id ? t.tour._id._id : 'unknown id';
                  const tourImg = t.tour._id ? t.tour._id.img1 : '';
                  return (
                    <tr key={Math.random()}>
                      <td className="small fw-bold text-md-start">{tourId}</td>
                      <td className="small fw-bold">
                        <Link to={'/detail/' + tourId}>
                          <img
                            src={tourImg}
                            alt={t.tour.name}
                            className="rounded"
                            width="150"
                            height="100"
                            onError={handleImgError}
                          />
                        </Link>
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
          </>
        )}
        {Object.keys(order).length === 0 && <div>Order này không tồn tại</div>}
      </div>
    </section>
  );
};

export default OrderDetail;
