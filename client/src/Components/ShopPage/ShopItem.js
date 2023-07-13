import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './ShopItem.module.css';
import { calcPrice } from 'utils/calcPrice';
import { handleImgError } from 'utils/imageUtils';

// Hàm tính giá tour khi có discount
function calcDiscountedPrice(discountId, price) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = discountedPrice.toLocaleString('vi-VN') + 'đ';
  return formattedPrice;
}

const ShopItem = ({ item }) => {
  const navigate = useNavigate(); // Sử dụng useNavigate() để điều hướng trang
  return (
    <div
      className="col-12 col-sm-6 col-lg-4 small"
      onClick={() => navigate(`/detail/${item._id}`)}
    >
      <div className={classes.shopList}>
        <div className={classes.mainImg}>
          <img
            src={item.img1}
            alt={item.category}
            className="w-100 main-animation"
            onError={handleImgError}
          />
          {item.discountId && (
            <span className={classes.current__discount}>
              Giảm {item.discountId.percentOff}%
            </span>
          )}
        </div>
        <div className={classes.shop__content}>
          <h3
            className={`${classes['zoom-in']} fw-bold small mb-1 main-animation`}
          >
            {item.name}
          </h3>
          <div>
            <span>Thời gian: </span>
            <b>
              {item.time} ngày {item.time - 1} đêm
            </b>
          </div>
          <div className={classes.locationStart}>
            <span>Nơi khởi hành: </span>
            <b>{item.locationStart.name}</b>
          </div>
          <div>
            <span>Giá: </span>
            <span className={classes.current__price}>
              {calcDiscountedPrice(item.discountId, item.adultPrice)}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {item.discountId ? (
              <span className={classes.price__old}>
                {item.adultPrice.toLocaleString('vi-VN')}đ
              </span>
            ) : (
              <span></span>
            )}
            <div>
              <span>Số chỗ còn: </span>
              <span className={classes.current__price}>{item.count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
