import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import './Detail.css';
import useHttp from 'hooks/use-http';
import { calcPrice } from 'utils/calcPrice';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';
import DetailHead from './DetailHead';
import DetailForm from './DetailForm';
import DetailTabDesc from './DetailTabDesc';
import DetailTabPrice from './DetailTabPrice';
import DetailTabWarn from './DetailTabWarn';
import DetailRelated from './DetailRelated';

// Hàm tính giá tour khi có discount
function calcDisPrice(discountId, price) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = discountedPrice.toLocaleString('vi-VN') + 'đ';
  return formattedPrice;
}

const Detail = () => {
  // Lấy thông tin url bằng useParams()
  const params = useParams();

  // State lưu kết quả lọc sau khi fetch
  const [tourData, setTourData] = useState({});

  // Lấy ra url cần Fetch từ state redux
  const urlFetchTour = useSelector(state => state.api.urlTour);
  const urlFetch = urlFetchTour + '/' + params.tourId;

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // Lưu kết quả vào state
      data.tour && setTourData(data.tour);
    };

    fetchData({ url: urlFetch }, transformData);
  }, [fetchData, urlFetch, params.id]);

  // tự động scroll về đầu trang nếu id thay đổi khi click related tour
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="container">
          {error && <p>{error}</p>}
          {Object.keys(tourData)?.length === 0 && (
            <p> Tour này không tồn tại</p>
          )}
        </div>
      )}

      {!isLoading && !error && Object.keys(tourData)?.length !== 0 && (
        <section className="tour-detail mb-5">
          <DetailHead tourData={tourData} calcDisPrice={calcDisPrice} />

          <div className="tab-panels">
            <div className="overview active">
              <section className="section-03 mb-4">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 col-12 left">
                      <div className="box-order">
                        <div className="time">
                          <div>
                            <span className="small">Thời gian: </span>
                            <b>
                              {tourData.time} ngày {tourData.time - 1} đêm
                            </b>
                          </div>
                          <div>
                            <span className="small">Nơi khởi hành: </span>
                            <b>{tourData.locationStart.name}</b>
                          </div>
                          <div>
                            <span className="small">Số chỗ còn nhận: </span>
                            <b>{tourData.count}</b>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8 col-12 right">
                      <DetailForm tourData={tourData} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <Tabs
            defaultActiveKey={1}
            id="uncontrolled-tab-example"
            className="detail-tabs container"
          >
            <Tab eventKey={1} title="Lịch trình">
              <div className="container mt-3 mb-5">
                <DetailTabDesc desc={tourData.desc} />
              </div>
            </Tab>

            <Tab eventKey={2} title="Giá">
              <div className="container mt-3 mb-5">
                <DetailTabPrice
                  tourData={tourData}
                  calcDisPrice={calcDisPrice}
                />
              </div>
            </Tab>

            <Tab eventKey={3} title="Lưu ý">
              <div className="container mt-3 mb-5">
                <DetailTabWarn />
              </div>
            </Tab>
          </Tabs>

          <DetailRelated
            currentTour={tourData._id}
            category={tourData.category}
            calcDisPrice={calcDisPrice}
          />
        </section>
      )}
    </>
  );
};

export default Detail;
