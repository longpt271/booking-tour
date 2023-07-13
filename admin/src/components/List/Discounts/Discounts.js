import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import ApiContext from 'context/ApiContext';
import { handleDelete, handleMultiDelete } from '../deleteUtils';
import Pagination from 'components/UI/Pagination/Pagination';
import ListHeader from 'components/UI/ListHeader/ListHeader';

const Discounts = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  // Lấy ra url cần Fetch từ state redux
  const urlSearchFetch = requests.getDiscounts;
  const urlDelete = requests.deleteDiscount;
  const urlDeleteMulti = requests.deleteDiscounts;

  const queryPage = pageNumber ? '?page=' + pageNumber : '';

  const urlFetch = urlSearchFetch + queryPage;

  location.search = queryPage; // lưu lại giá trị vào location.search khi query

  // Cập nhật lại url khi location thay đổi value
  const newUrl = location.pathname + queryPage;
  window.history.replaceState(null, null, newUrl);

  // func get data Api
  const getData = useCallback(() => {
    fetch(urlFetch, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setTotalResult(data.totalItems);
        setDataFetch(data.discounts);
      })
      .catch(err => console.log(err));
  }, [urlFetch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // state lưu các ids đã select
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  useEffect(() => {
    setSelectedDiscounts([]); // set lại rỗng khi chuyển trang
  }, [pageNumber]);

  // Xử lý select all
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedDiscounts([]);
    } else {
      const allDiscountIds = dataFetch.map(discount => discount._id);
      setSelectedDiscounts(allDiscountIds);
    }
    setSelectAll(!selectAll);
  };
  const handleRowClickAll = () => handleSelectAllChange(); // Toggle checkbox when row is clicked select all

  // effect khi tất cả checkbox được chọn sẽ setSelectAll = true
  useEffect(() => {
    if (selectedDiscounts.length === dataFetch.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedDiscounts.length, dataFetch.length]);

  return (
    <div className="dataTable text-gray">
      <ListHeader name1="Discounts" name2="Discount" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 60 }} onClick={handleRowClickAll}>
              <div className="d-flex">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Percent Off</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataFetch?.length !== 0 &&
            dataFetch.map(discount => {
              const isChecked = selectedDiscounts.includes(discount._id);

              const handleCheckboxChange = () => {
                if (isChecked) {
                  setSelectedDiscounts(
                    selectedDiscounts.filter(id => id !== discount._id)
                  );
                } else {
                  setSelectedDiscounts([...selectedDiscounts, discount._id]);
                }
              };

              const handleRowClick = () => handleCheckboxChange(); // Toggle checkbox when row is clicked

              return (
                <tr key={discount._id}>
                  <td
                    onClick={handleRowClick}
                    className={`cellWithStatus ${Boolean(discount.isInTour)}`} // css kiểm tra đã trong tour nào chưa
                  >
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      {discount.isInTour ? (
                        <CheckIcon
                          className="ms-2"
                          style={{ width: 15, height: 15 }}
                        />
                      ) : (
                        <CloseIcon
                          className="ms-2"
                          style={{ width: 15, height: 15 }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="small">{discount._id}</td>
                  <td className="small">{discount.name}</td>
                  <td className="small">{discount.percentOff}%</td>

                  <td
                    className={`small cellWithStatus 
                    ${Boolean(discount.status)}`}
                  >
                    {discount.status === 1 ? 'On' : 'Off'}
                  </td>

                  <td className="small">
                    <div className="cellAction">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          navigate(`/discounts/edit/${discount._id}`, {
                            state: discount,
                          });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete.bind(
                          this,
                          discount._id,
                          urlDelete,
                          getData,
                          dispatch
                        )}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {selectedDiscounts.length > 0 && (
        <Button
          variant="danger"
          size="sm"
          style={{ position: 'absolute' }}
          onClick={handleMultiDelete.bind(
            this,
            urlDeleteMulti,
            { discountIds: selectedDiscounts },
            setSelectedDiscounts,
            getData,
            dispatch
          )}
        >
          Delete {selectedDiscounts.length} selected
        </Button>
      )}
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

export default Discounts;
