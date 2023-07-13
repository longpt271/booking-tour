import React from 'react';
import { Link } from 'react-router-dom';

import './TourItem.css';
import { handleImgError } from 'utils/imageUtils';

const TourItem = ({ item, setModalShow, setTourModal, calcDisPrice }) => {
  return (
    <div className="tour-item">
      <div className="tour-item-image">
        <img
          src={item.img1}
          alt="Tour"
          className="img-tour"
          onError={handleImgError}
          onClick={() => {
            setTourModal(item);
            setModalShow(true);
          }}
        />
        {item.count === 0 && (
          <span className="current__discount bg-dark">SOLD OUT</span>
        )}
        {item.discountId && item.count !== 0 && (
          <span className="current__discount">
            Giảm {item.discountId.percentOff}%
          </span>
        )}
      </div>

      <div className="tour-content">
        <Link to={`detail/${item._id}`} className="tour-name">
          {item.name}
        </Link>
        <div>
          <span>Thời gian: </span>
          <b>
            {item.time} ngày {item.time - 1} đêm
          </b>
        </div>
        <div className="locationStart">
          <span>Nơi khởi hành: </span>
          <b>{item.locationStart.name}</b>
        </div>
        <div>
          <span>Giá: </span>
          <span className="current__price">
            {calcDisPrice(item.discountId, item.adultPrice)}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {item.discountId ? (
            <span className="price__old">
              {item.adultPrice.toLocaleString('vi-VN')}đ
            </span>
          ) : (
            <span></span>
          )}
          <div>
            <span>Số chỗ còn: </span>
            <span className="current__price">{item.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
