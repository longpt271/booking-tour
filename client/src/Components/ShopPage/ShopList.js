import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import classes from './ShopList.module.css';
import useHttp from 'hooks/use-http';
import HeaderPage from 'Components/UI/HeaderPage/HeaderPage';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';
import Pagination from 'Components/UI/Pagination/Pagination';
import SearchDebounce from './SearchDebounce';
import SearchCategory from './SearchCategory';
import SearchLocation from './SearchLocation';
import SearchTime from './SearchTime';
import SearchDiscount from './SearchDiscount';
import ShopListSort from './ShopListSort';
import ShopItem from './ShopItem';

const ShopList = () => {
  // lấy giá trị từ params để gán làm giá trị tìm kiếm mặc định
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationSearch = {};
  for (const [key, value] of params) {
    locationSearch[key] = value;
  }

  const rangeArr = locationSearch.priceRange
    ? locationSearch.priceRange.split('-').map(Number)
    : []; // Tạo arr price từ String priceRange

  // location state lưu tên của location đã chọn homepage
  const locState = location.state;
  const locName = locState ? locState.locName : '';

  // State lưu kết quả lọc sau khi fetch
  const [toursData, setToursData] = useState([]);
  const [totalResult, setTotalResult] = useState(null);

  // State lưu giá trị cần lọc
  const [pageNumber, setPageNumber] = useState(+locationSearch.page || 1);
  const [enteredSearch, setEnteredSearch] = useState(locationSearch.name || '');
  const [selectedCategory, setSelectedCategory] = useState(
    locationSearch.categoryId
      ? { value: locationSearch.categoryId, label: 'Select category' }
      : { value: '', label: 'Select category' }
  );
  const [selectedLocationStart, setSelectedLocationStart] = useState(
    locationSearch.locationStartId
      ? { value: locationSearch.locationStartId, label: 'Select location' }
      : { value: '', label: 'Select location' }
  );
  const [selectedLocation, setSelectedLocation] = useState(
    locationSearch.locationId
      ? { value: locationSearch.locationId, label: locName }
      : { value: '', label: 'Select location' }
  );
  const [startPriceRange, setStartPriceRange] = useState(rangeArr[0] || '');
  const [endPriceRange, setEndPriceRange] = useState(rangeArr[1] || '');
  const [enteredTime, setEnteredTime] = useState(locationSearch.time || '');
  const [enteredCount, setEnteredCount] = useState(locationSearch.count || '');
  const [isDiscount, setIsDiscount] = useState(locationSearch.isDiscount || '');
  const [priceOrder, setPriceOrder] = useState(locationSearch.priceOrder || '');
  const [nameOrder, setNameOrder] = useState(locationSearch.nameOrder || '');

  const categoryChangeHandler = data => {
    setPageNumber(1);
    setSelectedCategory(data);
  };
  const locationStartChangeHandler = data => {
    setPageNumber(1);
    setSelectedLocationStart(data);
  };
  const locationChangeHandler = data => {
    setPageNumber(1);
    setSelectedLocation(data);
  };
  const timeChangeHandler = value => {
    setPageNumber(1);
    setEnteredTime(value);
  };
  const discountChangeHandler = value => {
    setPageNumber(1);
    setIsDiscount(value);
  };
  // Lấy ra url cần Fetch từ state redux
  const urlSearchTours = useSelector(state => state.api.urlSearchTours);

  const queryPage = pageNumber ? '?page=' + pageNumber : '';
  const queryName = enteredSearch ? '&&name=' + enteredSearch : '';
  const queryCategory = selectedCategory.value
    ? '&&categoryId=' + selectedCategory.value
    : '';
  const queryLocationStart = selectedLocationStart.value
    ? '&&locationStartId=' + selectedLocationStart.value
    : '';
  const queryLocation = selectedLocation.value
    ? '&&locationId=' + selectedLocation.value
    : '';
  const queryPriceRange =
    startPriceRange || endPriceRange
      ? '&&priceRange=' + startPriceRange + '-' + endPriceRange
      : '';
  const queryTime = enteredTime ? '&&time=' + enteredTime : '';
  const queryCount = enteredCount ? '&&count=' + enteredCount : '';
  const queryIsDiscount = isDiscount ? '&&isDiscount=' + isDiscount : '';
  const queryPriceOrder = priceOrder ? '&&priceOrder=' + priceOrder : '';
  const queryNameOrder = nameOrder ? '&&nameOrder=' + nameOrder : '';
  const searchQuery =
    queryPage +
    queryName +
    queryCategory +
    queryLocationStart +
    queryLocation +
    queryPriceRange +
    queryTime +
    queryCount +
    queryIsDiscount +
    queryPriceOrder +
    queryNameOrder; // final query sẽ xuất hiện trên url

  const urlFetch = urlSearchTours + searchQuery;

  location.search = searchQuery; // lưu lại giá trị vào location.search khi query

  // Cập nhật lại url khi location thay đổi value
  const newUrl = location.pathname + searchQuery;
  window.history.replaceState(null, null, newUrl);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // Lưu tổng số kết quả trả về
      setTotalResult(data.totalItems);

      // set data trả về vào local state
      setToursData(data.tours);
      window.scrollTo(0, 0);
    };

    fetchData({ url: urlFetch }, transformData);
  }, [fetchData, urlFetch]);

  return (
    <section>
      <HeaderPage title="Tour" />

      <div className="row py-3 py-md-4">
        <div className="col-lg-3">
          <div className={classes.shop__sidebar}>
            <div className="py-2 px-4 bg-dark text-white mb-3">
              <strong className="small text-uppercase fw-bold">
                Lọc Kết quả
              </strong>
            </div>

            <div>
              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Tìm kiếm
                </strong>
                <SearchDebounce
                  enteredSearch={enteredSearch}
                  onSetEnteredSearch={setEnteredSearch}
                  onSetPageNumber={setPageNumber}
                  type="text"
                  placeholder="Enter tour name"
                />
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Loại Hình Tour
                </strong>
                <SearchCategory
                  selectedItems={selectedCategory}
                  handleSelect={categoryChangeHandler}
                />
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Điểm khởi hành
                </strong>
                <SearchLocation
                  selectedItems={selectedLocationStart}
                  handleSelect={locationStartChangeHandler}
                />
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Điểm sẽ đến
                </strong>
                <SearchLocation
                  selectedItems={selectedLocation}
                  handleSelect={locationChangeHandler}
                />
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  GIÁ TIỀN (vnđ)
                </strong>

                <div className="d-flex">
                  <SearchDebounce
                    enteredSearch={startPriceRange}
                    onSetEnteredSearch={setStartPriceRange}
                    onSetPageNumber={setPageNumber}
                    type="number"
                    placeholder="Min"
                    min="0"
                    step="500000"
                    className="me-1"
                  />

                  <SearchDebounce
                    enteredSearch={endPriceRange}
                    onSetEnteredSearch={setEndPriceRange}
                    onSetPageNumber={setPageNumber}
                    type="number"
                    placeholder="Max"
                    min={+startPriceRange + 500000}
                    step="500000"
                    className="ms-1"
                  />
                </div>
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Thời gian
                </strong>

                <SearchTime handlerChange={timeChangeHandler} />
              </div>

              <div className="px-3 pb-3 bg-light">
                <strong className="small text-uppercase fw-bold">
                  Số chỗ còn lại
                </strong>

                <SearchDebounce
                  enteredSearch={enteredCount}
                  onSetEnteredSearch={setEnteredCount}
                  onSetPageNumber={setPageNumber}
                  type="number"
                  placeholder="Enter number"
                  min="0"
                />
              </div>

              <div className="px-3 pb-3 bg-light d-flex justify-content-between">
                <strong className="small text-uppercase fw-bold">
                  Khuyến mãi
                </strong>

                <SearchDiscount
                  isDiscount={isDiscount}
                  handlerChange={discountChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9 mb-5 mb-lg-0">
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}

          {!isLoading && !error && totalResult !== 0 && (
            <>
              <div className="row mb-3 align-items-center">
                <div className="col-md-8 mt-2 mt-xl-0">
                  {searchQuery !== '?page=1' && (
                    <span>
                      Chúng tôi tìm thấy
                      <b> {totalResult}</b>
                      {totalResult > 1 ? ' tours ' : ' tour '}
                      cho Quý khách.
                    </span>
                  )}
                </div>
                <div className="col-md-4 mt-2 mt-xl-0">
                  <div className="list-inline d-flex align-items-center justify-content-end mb-0">
                    <ShopListSort
                      priceOrder={priceOrder}
                      nameOrder={nameOrder}
                      onSetPriceOrder={setPriceOrder}
                      onSetNameOrder={setNameOrder}
                    />
                  </div>
                </div>
              </div>
              <div className="row g-3">
                {toursData?.length !== 0 &&
                  toursData.map(tour => {
                    return <ShopItem key={tour._id} item={tour} />;
                  })}
              </div>
              <Pagination
                page={pageNumber}
                totalPage={Math.ceil(parseInt(totalResult) / 8)}
                handlerChangePage={setPageNumber}
                currentProduct={toursData.length}
                totalProduct={totalResult}
              />
            </>
          )}

          {!isLoading && error && <p>{error}</p>}
          {!isLoading && !error && toursData?.length === 0 && (
            <p className="centered">Chưa có tour nào!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopList;
