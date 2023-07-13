import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Tours.css';
import { calcPrice } from 'utils/calcPrice';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from 'hooks/use-http';
import TourItem from './TourItem';
import TourModal from './TourModal';

// Hàm tính giá tour khi có discount
function calcDisPrice(discountId, price) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = discountedPrice.toLocaleString('vi-VN') + 'đ';
  return formattedPrice;
}

const Tours = () => {
  // State lưu kết quả fetch
  const [toursData, setToursData] = useState([]);

  // Lấy ra url cần Fetch từ state redux
  const urlFetch = useSelector(state => state.api.urlTours);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // set data trả về với 6 phần tử đầu tiên
      setToursData(data.tours.slice(0, 6));
    };
    fetchData({ url: urlFetch }, transformData);
  }, [fetchData, urlFetch]);

  // state lưu data show modal
  const [modalShow, setModalShow] = useState(false);
  const [tourModal, setTourModal] = useState({});
  return (
    <section className="home-tours py-5">
      <div className="container">
        <TourModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          item={tourModal}
          calcDisPrice={calcDisPrice}
        />

        <header>
          <p className="small text-muted small text-uppercase mb-1">
            Made the hard way
          </p>
          <h4
            className="h5 fw-bold text-uppercase mb-4"
            style={{ letterSpacing: '0.1em' }}
          >
            Top trending tours
          </h4>
        </header>

        <div className="tour-list">
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && error && <p>{error}</p>}
          {!isLoading &&
            !error &&
            toursData?.length !== 0 &&
            toursData.map(item => {
              return (
                <TourItem
                  key={item._id}
                  item={item}
                  setModalShow={setModalShow}
                  setTourModal={setTourModal}
                  calcDisPrice={calcDisPrice}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Tours;
