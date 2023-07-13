import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

import classes from './CartTotal.module.css';
import { toastActions } from 'store/toast';
import { calcPrice } from 'utils/calcPrice';
import Button from 'Components/UI/Button/Button';

// Hàm tính giá tour khi có discount
function calcDisPrice(discountId, price, quantity) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = (
    <div className="d-flex justify-content-between text-secondary">
      <span>{discountedPrice.toLocaleString('vi-VN') + 'đ'}</span>
      <span className="ms-2">x{quantity}</span>
    </div>
  );
  return formattedPrice;
}

const CartTotal = () => {
  const dispatch = useDispatch();

  const listCart = useSelector(state => state.cart.listCart);
  const totalMoney = useSelector(state => state.cart.totalMoney);

  return (
    <div className={`${classes.cartTotal} bg-light p-5`}>
      <h4 className="mb-3">CART TOTAL</h4>
      {listCart.map((cart, i) => {
        return (
          <div key={i} className="d-flex justify-content-between mb-3">
            <b>#{i + 1}:</b>
            <div className="d-flex flex-column">
              {cart.adultQuantity !== 0 &&
                calcDisPrice(
                  cart.tourId.discountId,
                  cart.tourId.adultPrice,
                  cart.adultQuantity
                )}
              {cart.childQuantity !== 0 &&
                calcDisPrice(
                  cart.tourId.discountId,
                  cart.tourId.childPrice,
                  cart.childQuantity
                )}
              {cart.babyQuantity !== 0 &&
                calcDisPrice(
                  cart.tourId.discountId,
                  cart.tourId.babyPrice,
                  cart.babyQuantity
                )}
            </div>
          </div>
        );
      })}

      <div
        className={`${classes.totalPrice} py-3 d-flex justify-content-between`}
      >
        <b>TOTAL</b>
        <span className="fs-5">{totalMoney.toLocaleString('vi-VN')} VND</span>
      </div>
      <div className={classes.coupon}>
        <input type="text" placeholder="Enter your coupon" />
        <Button
          onClick={() => {
            dispatch(toastActions.SHOW_WARN('Tính năng này chưa khả dụng!'));
          }}
        >
          <FontAwesomeIcon icon={faGift} className="me-2" />
          Apply coupon
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
