import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'Components/UI/Button/Button';
import classes from './ThankYou.module.css';
import { checkoutActions } from 'store/checkout';

const ThankYou = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // điều hướng trang

  const orderIdState = location.state !== null ? location.state.orderId : '';

  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);

    // ẩn hiển thị checkout page (thankyou page) sau 8s
    const hideThankPage = setTimeout(() => {
      dispatch(checkoutActions.HIDE_checkout());
      navigate('/');
      // console.log('Hide ThankPage done!');
    }, 8000);

    //-- Using the useEffect Cleanup Function
    // Tránh setTimeout nhiều lần khi thay đổi url
    // chỉ set 1 lần khi mở trang
    return () => {
      clearTimeout(hideThankPage);
    };
  }, [dispatch, navigate]);

  return (
    <section className={`${classes['thankyou-wrapper']} container py-5 my-5`}>
      <h1>
        <img
          src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png"
          alt="thanks"
        />
      </h1>
      {/* <h6>for contacting us, we will get in touch with you soon... </h6> */}
      <h6>Bạn đã đặt tour thành công.</h6>
      <Link to={`/order/${orderIdState}`}>
        Nhấn link này để xem chi tiết hóa đơn
      </Link>
      <div className="centered mt-4">
        <Button
          className="me-4"
          onClick={() => {
            navigate('/');
          }}
        >
          Back to home
        </Button>
        <Button
          onClick={() => {
            navigate('/shop');
          }}
        >
          Shopping more
        </Button>
      </div>
    </section>
  );
};

export default ThankYou;
