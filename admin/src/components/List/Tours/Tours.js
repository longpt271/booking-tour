import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import ApiContext from 'context/ApiContext';
import { handleDelete, handleMultiDelete } from '../deleteUtils';
import Pagination from 'components/UI/Pagination/Pagination';
import ListHeader from 'components/UI/ListHeader/ListHeader';
import SearchDebounce from '../SearchDebounce';
import SearchDiscount from './SearchDiscount';
import SearchCategory from './SearchCategory';
import SearchLocation from './SearchLocation';
import TourSort from './TourSort';

// Hàm tính giá tour khi có discount
function calcDiscountedPrice(tour, price) {
  const discountedPrice = !tour.discountId
    ? price
    : price - price * (tour.discountId.percentOff / 100);
  const formattedPrice = '- ' + discountedPrice.toLocaleString('vi-VN') + 'đ';

  return formattedPrice;
}

const Tours = props => {
  const location = useLocation();
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
  const [enteredSearch, setEnteredSearch] = useState(locationSearch.name || '');
  const [selectedCategory, setSelectedCategory] = useState(
    locationSearch.categoryId || ''
  );
  const [selectedLocation, setSelectedLocation] = useState(
    locationSearch.locationId || ''
  );
  const [selectedDiscount, setSelectedDiscount] = useState(
    locationSearch.discountId || ''
  );
  const [nameOrder, setNameOrder] = useState(locationSearch.nameOrder || '');
  const [priceOrder, setPriceOrder] = useState(locationSearch.priceOrder || '');

  const categoryChangeHandler = data => {
    setPageNumber(1);
    setSelectedCategory(data);
  };
  const locationChangeHandler = data => {
    setPageNumber(1);
    setSelectedLocation(data);
  };
  const discountChangeHandler = data => {
    setPageNumber(1);
    setSelectedDiscount(data);
  };

  // Lấy ra url cần Fetch từ state redux
  const urlSearchFetch = requests.urlSearchTours;
  const urlDelete = requests.deleteTour;
  const urlDeleteMulti = requests.deleteTours;

  const queryPage = pageNumber ? '?page=' + pageNumber : '';
  const queryName = enteredSearch ? '&&name=' + enteredSearch : '';
  const queryCategory = selectedCategory.value
    ? '&&categoryId=' + selectedCategory.value
    : '';
  const queryLocation = selectedLocation.value
    ? '&&locationId=' + selectedLocation.value
    : '';
  const queryDiscount = selectedDiscount.value
    ? '&&discountId=' + selectedDiscount.value
    : '';
  const queryPriceOrder = priceOrder ? '&&priceOrder=' + priceOrder : '';
  const queryNameOrder = nameOrder ? '&&nameOrder=' + nameOrder : '';
  const searchQuery =
    queryPage +
    queryName +
    queryCategory +
    queryLocation +
    queryDiscount +
    queryNameOrder +
    queryPriceOrder;

  const urlFetch = urlSearchFetch + searchQuery;

  location.search = searchQuery; // lưu lại giá trị vào location.search khi query

  // Cập nhật lại url khi location thay đổi value
  const newUrl = location.pathname + searchQuery;
  window.history.replaceState(null, null, newUrl);

  // func get data Api
  const getData = useCallback(() => {
    fetch(urlFetch, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setTotalResult(data.totalItems);
        setDataFetch(data.tours);
      })
      .catch(err => console.log(err));
  }, [urlFetch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // state lưu các ids đã select
  const [selectedTours, setSelectedTours] = useState([]);

  useEffect(() => {
    setSelectedTours([]); // set lại rỗng khi chuyển trang
  }, [pageNumber]);

  // Xử lý select all
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedTours([]);
    } else {
      const allDiscountIds = dataFetch.map(discount => discount._id);
      setSelectedTours(allDiscountIds);
    }
    setSelectAll(!selectAll);
  };
  const handleRowClickAll = () => handleSelectAllChange(); // Toggle checkbox when row is clicked select all

  // effect khi tất cả checkbox được chọn sẽ setSelectAll = true
  useEffect(() => {
    if (selectedTours.length === dataFetch.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedTours.length, dataFetch.length]);

  return (
    <div className="dataTable text-gray">
      <ListHeader name1="tours" name2="tour" />

      <div className="mb-3 d-flex justify-content-between">
        <div className="d-flex">
          <SearchDebounce
            enteredSearch={enteredSearch}
            onSetEnteredSearch={setEnteredSearch}
            onSetPageNumber={setPageNumber}
            placeholder="Search name tour"
          />

          <SearchCategory
            selectedItems={selectedCategory}
            handleSelect={categoryChangeHandler}
          />
          <SearchLocation
            selectedItems={selectedLocation}
            handleSelect={locationChangeHandler}
          />
          <SearchDiscount
            selectedItems={selectedDiscount}
            handleSelect={discountChangeHandler}
          />
        </div>

        <TourSort
          onSetNameOrder={setNameOrder}
          onSetPriceOrder={setPriceOrder}
        />
      </div>

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
            <th>Time</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Count</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataFetch?.length !== 0 &&
            dataFetch.map(tour => {
              const isChecked = selectedTours.includes(tour._id);

              const handleCheckboxChange = () => {
                if (isChecked) {
                  setSelectedTours(selectedTours.filter(id => id !== tour._id));
                } else {
                  setSelectedTours([...selectedTours, tour._id]);
                }
              };

              const handleRowClick = () => handleCheckboxChange(); // Toggle checkbox when row is clicked

              return (
                <tr key={tour._id}>
                  <td
                    onClick={handleRowClick}
                    className={`cellWithStatus ${Boolean(tour.isInOrder)}`} // css kiểm tra đã trong order nào chưa
                  >
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      {tour.isInOrder ? (
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
                  <td className="small">{tour._id}</td>
                  <td>
                    <img
                      src={tour.img1}
                      className="rounded"
                      alt={tour._id}
                      height="60"
                    />
                  </td>
                  <td className="small">{tour.name}</td>
                  <td className="small">
                    {tour.time} ngày {tour.time - 1} đêm
                  </td>
                  <td className="small ">
                    <div className="d-flex flex-column">
                      <span>{calcDiscountedPrice(tour, tour.adultPrice)}</span>
                      <span>{calcDiscountedPrice(tour, tour.childPrice)}</span>
                      <span>{calcDiscountedPrice(tour, tour.babyPrice)}</span>
                    </div>
                  </td>
                  <td className="small ">
                    {tour.discountId
                      ? `${tour.discountId.percentOff}%`
                      : 'None'}
                  </td>

                  <td className="small">{tour.count}</td>
                  <td className="small">
                    <div className="cellAction">
                      <Link to={`/tours/edit/${tour._id}`}>
                        <Button variant="success" size="sm">
                          Update
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete.bind(
                          this,
                          tour._id,
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

      {selectedTours.length > 0 && (
        <Button
          variant="danger"
          size="sm"
          style={{ position: 'absolute' }}
          onClick={handleMultiDelete.bind(
            this,
            urlDeleteMulti,
            { tourIds: selectedTours },
            setSelectedTours,
            getData,
            dispatch
          )}
        >
          Delete {selectedTours.length} selected
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

export default Tours;
