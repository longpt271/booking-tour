import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import classes from './CartItem.module.css';
import { toastActions } from 'store/toast';
import { cartActions } from 'store/cart';
import { handleImgError } from 'utils/imageUtils';
import InputItemCart from 'Components/UI/InputItemCart/InputItemCart';

const CartItem = ({ cart, num }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(
    new Date(cart.startDate) || new Date()
  );
  const [options, setOptions] = useState({
    adult: cart.adultQuantity || 0,
    child: cart.childQuantity || 0,
    baby: cart.babyQuantity || 0,
  });

  const handleOption = (name, operation) => {
    const totalQuantity =
      options.adult +
      options.child +
      options.baby +
      (operation === 'i' ? +1 : -1);
    if (totalQuantity <= cart.tourId.count) {
      setOptions(prev => {
        return {
          ...prev,
          [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
        };
      });

      const newData = {
        startDate: startDate.toISOString(),
        [`${name}Quantity`]: operation === 'i' ? +1 : -1,
      };

      updateCartHandler(cart.tourId, newData);
    } else {
      dispatch(
        toastActions.SHOW_WARN(
          'Tour này chỉ còn nhận ' + cart.tourId.count + ' người!'
        )
      );
    }
  };

  const urlAddCart = useSelector(state => state.api.urlAddCart);
  const urlRemoveCart = useSelector(state => state.api.urlCart);

  // Hàm xử lý tăng giảm số lượng
  const updateCartHandler = async (tourData, newData) => {
    try {
      const res = await fetch(urlAddCart, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tourData._id,
          ...newData,
        }),
        credentials: 'include',
      });

      if (res.status === 401) {
        throw new Error('Please login!');
      }

      const data = await res.json();
      if (res.ok) {
        dispatch(
          cartActions.UPDATE_CART({
            tourId: tourData,
            ...newData,
          })
        );
      } else {
        throw new Error(data.message || 'Something error!');
      }
    } catch (error) {
      dispatch(toastActions.SHOW_WARN(error.toString() || 'Add failed!'));
    }
  };

  // Xử lý remove cart
  const clickRemoveHandler = id => {
    confirmAlert({
      message: 'Confirm to delete',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const res = await fetch(urlRemoveCart + '/' + id, {
                method: 'DELETE',
                credentials: 'include',
              });
              if (res.status === 401) {
                throw new Error('Please login!');
              }

              const data = await res.json();
              if (res.ok) {
                dispatch(
                  cartActions.DELETE_CART({ _id: id, shouldListen: true })
                );
                // thông báo Xóa thành công
                dispatch(toastActions.SHOW_SUCCESS(data.message || 'Deleted!'));
              } else {
                throw new Error(data.message || 'Delete error!');
              }
            } catch (error) {
              dispatch(
                toastActions.SHOW_WARN(error.toString() || 'Delete failed!')
              );
            }
          },
        },
        { label: 'No' },
      ],
    });
  };

  return (
    <li className={`${classes['cart-item']} row gx-0 py-2`}>
      <div className="col-12 col-md-1 d-none d-md-block">{num}</div>

      <div className="col-12 col-md-2">
        <Link to={`/detail/${cart.tourId._id}`}>
          <img
            src={cart.tourId.img1}
            alt={cart.tourId.name}
            className="rounded"
            style={{ width: '70%' }}
            onError={handleImgError}
          />
        </Link>
      </div>

      <h6 className="col-md-3 mt-2 mt-md-0">
        <Link
          to={`/detail/${cart.tourId._id}`}
          className="text-decoration-none text-secondary pt-2 pt-md-0"
        >
          {cart.tourId.name}
        </Link>
      </h6>

      <div className="col-md-5 d-flex flex-column flex-xxl-row justify-content-xxl-around align-items-center align-items-md-start">
        <InputItemCart
          tourData={cart.tourId}
          startDate={startDate}
          setStartDate={setStartDate}
          options={options}
          handleOption={handleOption}
        />
      </div>

      <div className="col-md-1 text-secondary">
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={clickRemoveHandler.bind(null, cart.tourId._id)}
          className="p-2 active-animation"
        />
      </div>
    </li>
  );
};

export default React.memo(CartItem);
