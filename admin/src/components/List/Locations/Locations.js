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

const Locations = props => {
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
  const urlSearchFetch = requests.getLocations;
  const urlDelete = requests.deleteLocation;
  const urlDeleteMulti = requests.deleteLocations;

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
        setDataFetch(data.locations);
      })
      .catch(err => console.log(err));
  }, [urlFetch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // state lưu các ids đã select
  const [selectedLocations, setSelectedLocations] = useState([]);

  useEffect(() => {
    setSelectedLocations([]); // set lại rỗng khi chuyển trang
  }, [pageNumber]);

  // Xử lý select all
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedLocations([]);
    } else {
      const allDiscountIds = dataFetch.map(discount => discount._id);
      setSelectedLocations(allDiscountIds);
    }
    setSelectAll(!selectAll);
  };
  const handleRowClickAll = () => handleSelectAllChange(); // Toggle checkbox when row is clicked select all

  // effect khi tất cả checkbox được chọn sẽ setSelectAll = true
  useEffect(() => {
    if (selectedLocations.length === dataFetch.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedLocations.length, dataFetch.length]);

  return (
    <div className="dataTable text-gray">
      <ListHeader name1="Locations" name2="Location" />

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
            <th>Image</th>
            <th>Name</th>
            <th>country</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataFetch?.length !== 0 &&
            dataFetch.map(locItem => {
              const isChecked = selectedLocations.includes(locItem._id);

              const handleCheckboxChange = () => {
                if (isChecked) {
                  setSelectedLocations(
                    selectedLocations.filter(id => id !== locItem._id)
                  );
                } else {
                  setSelectedLocations([...selectedLocations, locItem._id]);
                }
              };

              const handleRowClick = () => handleCheckboxChange(); // Toggle checkbox when row is clicked

              return (
                <tr key={locItem._id}>
                  <td
                    onClick={handleRowClick}
                    className={`cellWithStatus ${Boolean(locItem.isInTour)}`} // css kiểm tra đã trong tour nào chưa
                  >
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      {locItem.isInTour ? (
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
                  <td className="small">{locItem._id}</td>
                  <td>
                    <img
                      src={locItem.img}
                      className="rounded"
                      alt={locItem._id}
                      height="60"
                    />
                  </td>
                  <td className="small">{locItem.name}</td>
                  <td className="small">{locItem.country}</td>
                  <td className="small">
                    <div className="cellAction">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          navigate(`/locations/edit/${locItem._id}`, {
                            state: locItem,
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
                          locItem._id,
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

      {selectedLocations.length > 0 && (
        <Button
          variant="danger"
          size="sm"
          style={{ position: 'absolute' }}
          onClick={handleMultiDelete.bind(
            this,
            urlDeleteMulti,
            { locationIds: selectedLocations },
            setSelectedLocations,
            getData,
            dispatch
          )}
        >
          Delete {selectedLocations.length} selected
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

export default Locations;
