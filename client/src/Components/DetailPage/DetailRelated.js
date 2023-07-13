import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useHttp from 'hooks/use-http';
import { handleImgError } from 'utils/imageUtils';

const DetailRelated = ({ currentTour, category, calcDisPrice }) => {
  const categoryIds = useMemo(() => {
    return category.map(cat => cat._id);
  }, [category]);

  // State lưu kết các tour liên quan khác
  const [otherTours, setOtherTours] = useState([]);

  const urlFetch = useSelector(state => state.api.urlRelated);

  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // set data trả về với 4 phần tử đầu tiên
      data.tours && setOtherTours(data.tours.slice(0, 4));
    };

    fetchData(
      {
        url: urlFetch,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { _id: currentTour, categoryIds: categoryIds },
      },
      transformData
    );
  }, [fetchData, urlFetch, currentTour, categoryIds]);

  return (
    <div className="container gx-0 d-none d-lg-block">
      <h2 className="h5 text-uppercase fw-bold mt-5 mb-4">
        Có thể Quý khách sẽ thích
      </h2>
      <div className="related">
        <section className="section-11" id="divTourGoiY">
          <div className="row">
            <div className="products">
              {otherTours.length !== 0 &&
                otherTours.map(tour => {
                  return (
                    <div key={tour._id} className="product">
                      <div className="product-inner">
                        <div className="product-image">
                          <Link to={'/detail/' + tour._id}>
                            <img
                              src={tour.img1}
                              alt={tour._id}
                              onError={handleImgError}
                            />
                          </Link>
                        </div>
                        <div className="product-content">
                          <span className="meta">
                            {tour.time} ngày {tour.time - 1} đêm
                          </span>
                          <h3 className="product-title">
                            <Link to={'/detail/' + tour._id} title={tour.name}>
                              {tour.name}
                            </Link>
                          </h3>
                          <p className="des">
                            Nơi khởi hành {tour.locationStart.name}
                          </p>
                          <div className="tour-item__price--current group-price mb-2">
                            {/* <div className="or-price">
                                <p>
                                  Giá{' '}
                                  <span className="or-price">10,990,000</span>
                                </p>
                              </div> */}
                            <div className="sale-price">
                              {tour.discountId && tour.count !== 0 && (
                                <span className="sale">
                                  {tour.discountId.percentOff}% Giảm
                                </span>
                              )}
                              {tour.count === 0 && (
                                <span className="sale bg-dark">SOLD OUT</span>
                              )}
                              <span className="price">
                                {calcDisPrice(tour.discountId, tour.adultPrice)}
                              </span>
                            </div>
                          </div>
                          <div className="tour-item__price--current d-flex justify-content-between align-items-center">
                            <div className="btn-bloc">
                              <Link
                                to={'/detail/' + tour._id}
                                title="Xem chi tiết"
                                className="btn product__btn-detail"
                              >
                                Xem chi tiết
                              </Link>
                            </div>
                            <div className="btn-book">
                              <Link
                                id="btnDatNgay"
                                to={'/detail/' + tour._id}
                                className="btn btn-primary btn-sm"
                              >
                                Đặt ngay
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {otherTours.length === 0 && (
                <p className="text-secondary">- Chưa có sản phẩm liên quan</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailRelated;
