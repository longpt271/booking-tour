import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import classes from './Cart.module.css';
import useHttp from 'hooks/use-http';
import HeaderPage from 'Components/UI/HeaderPage/HeaderPage';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { cartActions } from 'store/cart';
import { checkoutActions } from 'store/checkout';
import { toastActions } from 'store/toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlFetch = useSelector(state => state.api.urlCart);
  const listCart = useSelector(state => state.cart.listCart);
  const totalMoney = useSelector(state => state.cart.totalMoney);

  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // Lưu tổng số kết quả trả về vào cart store
      dispatch(cartActions.SET_CART(data.cart));
    };

    fetchData({ url: urlFetch }, transformData);
  }, [fetchData, urlFetch, dispatch]);

  // Biến xác định có cart nào k
  const hasCart = listCart.length > 0;

  const checkoutHandler = () => {
    // ngăn hiển thị checkout page nếu chưa có cart nào
    if (!hasCart) {
      dispatch(toastActions.SHOW_INFO('Continue shopping...'));
    } else {
      // cho phép hiển thị checkout page chỉ khi bấm nút checkout
      dispatch(checkoutActions.SHOW_checkout());

      // Chuyển hướng sang checkout page
      navigate('/checkout', {
        state: { listCart: listCart, totalMoney: totalMoney },
      });
    }
  };

  return (
    <section>
      <HeaderPage title="cart" />

      <div className="row py-4 gx-0">
        <h4
          className={`${classes.titleCart} h5 fw-bold text-uppercase mb-4 d-none d-lg-block`}
        >
          SHOPPING CART
        </h4>

        <div className="col-lg-9 text-center pe-lg-4">
          <ul className="p-0">
            <li className={`${classes.rowHeader} row gx-0 pt-3 pb-2`}>
              <h6 className="col-md-1">#</h6>
              <h6 className="col-md-2">Ảnh</h6>
              <h6 className="col-md-3">Tên</h6>
              <h6 className="col-md-2">Thời Gian</h6>
              <h6 className="col-md-3">Số lượng</h6>
              <h6 className="col-md-1">Xóa</h6>
            </li>
            {hasCart &&
              listCart.map((cart, i) => {
                return <CartItem key={cart._id} cart={cart} num={i + 1} />;
              })}
            {!hasCart && (
              <p className="centered mt-3 mt-md-5 text-secondary">
                Chưa có tour nào trong giỏ hàng
              </p>
            )}
          </ul>
          <div className="d-flex flex-column flex-sm-row justify-content-between bg-light mt-5 p-4">
            <button
              onClick={() => navigate('/shop')}
              className={`${classes.shoppingBtn} small active-animation mb-2 mb-md-0`}
            >
              <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-2" />
              Continue shopping
            </button>
            <button
              onClick={checkoutHandler}
              className={`${classes.checkoutBtn} small align-self-end`}
            >
              Proceed to checkout
              <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-2" />
            </button>
          </div>
        </div>

        <div className="col-lg-3">
          <CartTotal />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Cart);
