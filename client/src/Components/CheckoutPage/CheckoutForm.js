import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert

import classes from './CheckoutForm.module.css';
import useHttp from 'hooks/use-http';
import { cartActions } from 'store/cart';
import { toastActions } from 'store/toast';
import { calcPrice } from 'utils/calcPrice';

const CheckoutForm = ({ listCart, totalMoney }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // States lưu entered input
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFullName, setEnteredFullName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');

  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const fullNameChangeHandler = e => setEnteredFullName(e.target.value);
  const phoneChangeHandler = e => setEnteredPhone(e.target.value);

  // dùng useRef() để lấy value input
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const phoneInputRef = useRef();

  // url
  const urlUserInfoFetch = useSelector(state => state.api.urlUserInfo);
  const urlCreateOrderFetch = useSelector(state => state.api.urlCreateOrder);
  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      setEnteredEmail(data.email);
      setEnteredFullName(data.fullName);
      setEnteredPhone(data.phone);
    };
    fetchData({ url: urlUserInfoFetch }, transformData);
  }, [fetchData, urlUserInfoFetch]);

  // Xử lý ấn submit form
  const submitHandler = event => {
    event.preventDefault();

    if (enteredEmail.trim() === '') {
      emailInputRef.current.focus();
    } else if (enteredFullName.trim() === '') {
      fullNameInputRef.current.focus();
    } else if (enteredPhone === '') {
      phoneInputRef.current.focus();
    }

    const dataOrder = listCart.map(item => {
      // tính endDate = startDate + time
      const endDate = new Date(
        new Date(item.startDate).getTime() +
          item.tourId.time * 24 * 60 * 60 * 1000
      ).toISOString();
      return {
        tour: {
          _id: item.tourId._id,
          name: item.tourId.name,
          locationStart: item.tourId.locationStart.name,
          adultPrice: calcPrice(item.tourId.discountId, item.tourId.adultPrice),
          childPrice: calcPrice(item.tourId.discountId, item.tourId.childPrice),
          babyPrice: calcPrice(item.tourId.discountId, item.tourId.babyPrice),
        },
        startDate: item.startDate,
        endDate: endDate,
        adultQuantity: item.adultQuantity,
        childQuantity: item.childQuantity,
        babyQuantity: item.babyQuantity,
      };
    });

    const enteredData = {
      userInfo: {
        email: enteredEmail,
        fullName: enteredFullName,
        phone: enteredPhone,
      },
      tours: dataOrder,
      totalMoney: totalMoney,
    };

    confirmAlert({
      message: 'Confirm to order',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            // cập nhật dữ liệu order
            try {
              const res = await fetch(urlCreateOrderFetch, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enteredData),
                credentials: 'include',
              });

              const data = await res.json();
              if (res.status === 401) {
                throw new Error('Please login!');
              }

              if (res.status === 403) {
                throw new Error(data.message ? data.message : 'Out of stock!');
              }

              if (res.ok) {
                // SET_DEFAULT lại state cart
                dispatch(cartActions.SET_DEFAULT());

                dispatch(
                  toastActions.SHOW_SUCCESS(data.message || 'Order success!')
                );

                // điều hướng đến thankyou page
                navigate('/thankyou', { state: { orderId: data.orderId } });
              } else {
                throw new Error('Something error!');
              }
            } catch (error) {
              dispatch(
                toastActions.SHOW_WARN(error.toString() || 'Order failed!')
              );
            }
          },
        },
        { label: 'No' },
      ],
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email Here!"
          required
          ref={emailInputRef}
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <label htmlFor="fullName">FULL NAME:</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter Your Full Name Here!"
          required
          ref={fullNameInputRef}
          value={enteredFullName}
          onChange={fullNameChangeHandler}
        />
        <label htmlFor="phone">PHONE NUMBER:</label>
        <input
          type="number"
          id="phone"
          placeholder="Enter Your Phone Here!"
          required
          ref={phoneInputRef}
          value={enteredPhone}
          onChange={phoneChangeHandler}
        />
      </div>

      <div className={classes.actions}>
        <button>Place order</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
