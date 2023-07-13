import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import classes from './Checkout.module.css';
import HeaderPage from 'Components/UI/HeaderPage/HeaderPage';
import CheckoutForm from './CheckoutForm';
import CheckoutOrder from './CheckoutOrder';

const Checkout = () => {
  const location = useLocation();
  const listCart = location.state !== null ? location.state.listCart : [];
  const totalMoney = location.state !== null ? location.state.totalMoney : 0;

  // Lấy state redux
  const isShowCheckout = useSelector(state => state.checkout.isShow);

  return (
    <>
      {isShowCheckout && (
        <section>
          <HeaderPage title="checkout" />

          <div className="row py-5 gx-0">
            <h4
              className={`${classes.titleCheckout} h5 fw-bold text-uppercase mb-4`}
            >
              Thông tin hóa đơn
            </h4>

            <div className="col-lg-6 order-2 order-lg-1 pe-lg-4">
              <CheckoutForm listCart={listCart} totalMoney={totalMoney} />
            </div>

            <div className="col-lg-6 order-1 order-lg-2 pb-4 pb-lg-0">
              <CheckoutOrder listCart={listCart} totalMoney={totalMoney} />
            </div>
          </div>
        </section>
      )}

      {!isShowCheckout && (
        <p className="centered pt-5">
          Please check your cart and then checkout!
        </p>
      )}
    </>
  );
};

export default Checkout;
