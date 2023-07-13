import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { toastActions } from 'store/toast';
import ApiContext from 'context/ApiContext';
import Pagination from 'components/UI/Pagination/Pagination';
import ListHeader from 'components/UI/ListHeader/ListHeader';

const formattedTime = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11), nên cộng thêm 1
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} (${hours}:${minutes})`; // trả về Định dạng thành chuỗi "dd/mm/yyyy hh:mm"
};

const Orders = ({ urlSearchFetch, onChangeEarning }) => {
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const location = useLocation();
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api

  // lấy giá trị từ params để gán làm giá trị tìm kiếm mặc định
  const params = new URLSearchParams(location.search);
  const locationSearch = {};
  for (const [key, value] of params) {
    locationSearch[key] = value;
  }

  // State lưu kết quả lọc sau khi fetch
  const [dataFetch, setDataFetch] = useState([]);
  const [totalResult, setTotalResult] = useState(null);

  // State lưu giá trị cần lọc
  const [pageNumber, setPageNumber] = useState(+locationSearch.page || 1);

  const queryPage = pageNumber ? '?page=' + pageNumber : '';

  const urlFetch = urlSearchFetch + queryPage;

  location.search = queryPage; // lưu lại giá trị vào location.search khi query

  // Cập nhật lại url khi location thay đổi value
  const newUrl = location.pathname + queryPage;
  window.history.replaceState(null, null, newUrl);

  // func get data Api
  const getData = useCallback(async () => {
    try {
      const res = await fetch(urlFetch, { credentials: 'include' });
      if (res.status === 401) {
        throw new Error('Please login!');
      }
      if (res.ok) {
        const data = await res.json();
        setTotalResult(data.totalItems);
        setDataFetch(data.orders);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [urlFetch]);
  useEffect(() => {
    getData();
  }, [getData]);

  const urlOrderIsPay = requests.patchOrderIsPay;
  const urlOrderStatus = requests.patchOrderStatus;

  // hàm xử lý click edit isPay/status
  const handleChange = useCallback(
    (dataIn, url, type) => {
      // fetch update status tran
      const fetchChange = async value => {
        const dataNew =
          type.toString() === 'isPay'
            ? { orderId: dataIn._id, isPay: value }
            : { orderId: dataIn._id, status: value };

        try {
          const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataNew),
            credentials: 'include',
          });

          if (response.ok && type.toString() === 'status' && onChangeEarning) {
            if (value === 'done' && dataIn.isPay) {
              onChangeEarning(dataIn.totalMoney); // Cập nhập cộng thêm earning ở home dashboard
            } else {
              // nếu status hiện tại = 'done'
              if (dataIn.status === 'done') {
                onChangeEarning(-dataIn.totalMoney); // Cập nhập trừ đi earning ở home dashboard
              }
            }
          }

          const data = await response.json();
          if (response.ok) {
            dispatch(
              toastActions.SHOW_SUCCESS(data.message || 'Fetch successfully!')
            ); // toast
            getData(); // load lại data
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          dispatch(toastActions.SHOW_WARN(error.toString() || 'Fetch failed!'));
        }
      };

      confirmAlert({
        message: 'Choose new ' + type,
        buttons: [
          type.toString() !== 'isPay' && {
            label: 'Cancelled',
            onClick: () => {
              if (type.toString() !== 'isPay') {
                fetchChange('cancelled');
              }
            },
          },
          {
            label: type.toString() === 'isPay' ? 'Chưa thanh toán' : 'Waiting',
            onClick: () => {
              fetchChange(type.toString() === 'isPay' ? false : 'waiting');
            },
          },
          {
            label: type.toString() === 'isPay' ? 'Đã thanh toán' : 'Done',
            onClick: () => {
              fetchChange(type.toString() === 'isPay' ? true : 'done');
            },
          },
        ].filter(Boolean), // Remove falsy values from the array
      });
    },
    [getData, onChangeEarning, dispatch]
  );

  return (
    <div className="dataTable">
      {location.pathname === '/' ? (
        <div className="fw-bold shadow-none p-3 mb-3 bg-light rounded">
          <span className="text-capitalize">Orders are pending...</span>
        </div>
      ) : (
        <ListHeader name1="Orders" />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Created At</th>
            <th>ID Order</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>isPay</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {dataFetch?.length !== 0 &&
            dataFetch.map(order => {
              const isPay =
                order.isPay === false ? (
                  'Chưa thanh toán'
                ) : order.isPay === true ? (
                  <span>
                    Đã thanh toán
                    <CheckCircleIcon
                      className="ms-1 mb-1"
                      style={{ width: '15px' }}
                    />
                  </span>
                ) : (
                  ''
                );
              const status = (() => {
                if (order.status === 'waiting') {
                  return <span className="text-warning">Đang trong tour</span>;
                } else if (order.status === 'done') {
                  return (
                    <span className="text-success">
                      Đã hoàn thành
                      <CheckCircleIcon
                        className="ms-1 mb-1"
                        style={{ width: '15px' }}
                      />
                    </span>
                  );
                } else if (order.status === 'cancelled') {
                  return <span className="text-danger">Đã hủy</span>;
                }
                return null;
              })();
              return (
                <tr key={order._id}>
                  <td>{formattedTime(order.createdAt)}</td>
                  <td className="small">{order._id}</td>
                  <td className="small overflow-hidden">
                    <span>{order.tours.length} </span>
                    {order.tours.length > 1 ? 'tours' : 'tour'}
                  </td>
                  <td className="small">
                    {order.totalMoney.toLocaleString('vi-VN')}
                  </td>
                  <td
                    className={`small cellWithStatus ${order.isPay}`}
                    onClick={handleChange.bind(
                      this,
                      order,
                      urlOrderIsPay,
                      'isPay'
                    )}
                  >
                    {isPay}
                  </td>
                  <td
                    className={`small cellWithStatus ${order.status}`}
                    onClick={handleChange.bind(
                      this,
                      order,
                      urlOrderStatus,
                      'status'
                    )}
                  >
                    {status}
                  </td>
                  <td>
                    <Link to={'/orders/find/' + order._id}>
                      <Button variant="success" size="sm">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination
        page={pageNumber}
        totalPage={Math.ceil(parseInt(totalResult) / 8)}
        handlerChangePage={setPageNumber}
        currentProduct={dataFetch.length}
        totalProduct={totalResult}
      />
    </div>
  );
};

export default Orders;
