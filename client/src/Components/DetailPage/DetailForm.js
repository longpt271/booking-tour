import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import './DetailForm.css';
import { toastActions } from 'store/toast';
import { checkoutActions } from 'store/checkout';
import { calcTotalPrice } from 'utils/calcPrice';
import InputItemCart from 'Components/UI/InputItemCart/InputItemCart';

const DetailForm = ({ tourData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Dùng cập nhật state redux
  // Lấy dữ liệu login state redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const urlFetch = useSelector(state => state.api.urlAddCart); //--- url

  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [options, setOptions] = useState({ adult: 1, child: 0, baby: 0 });

  const handleOption = (name, operation) => {
    const totalQuantity =
      options.adult +
      options.child +
      options.baby +
      (operation === 'i' ? +1 : -1);
    if (totalQuantity <= tourData.count) {
      setQuantityIsValid(true);

      setOptions(prev => {
        return {
          ...prev,
          [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
        };
      });
    } else {
      setQuantityIsValid(false);
    }
  };

  const checkoutHandler = async () => {
    // Nếu chưa đăng nhập: chuyển trang và return
    if (!isAuthenticated) {
      navigate('/login', { state: { oldPath: location.pathname } });
      return;
    }

    // Tạo data truyền vào checkout page
    const newData = [
      {
        startDate: startDate.toISOString(),
        adultQuantity: +options.adult,
        childQuantity: +options.child,
        babyQuantity: +options.baby,
        tourId: tourData,
      },
    ];
    const totalMoney = newData.reduce((curNumber, item) => {
      return (
        curNumber +
        calcTotalPrice(
          item.tourId.discountId,
          item.tourId.adultPrice,
          item.adultQuantity
        ) +
        calcTotalPrice(
          item.tourId.discountId,
          item.tourId.childPrice,
          item.childQuantity
        ) +
        calcTotalPrice(
          item.tourId.discountId,
          item.tourId.babyPrice,
          item.babyQuantity
        )
      );
    }, 0);

    try {
      if (options.adult === 0) {
        throw new Error('Vui lòng chọn ít nhất 1 người lớn!');
      }

      // cho phép hiển thị checkout page chỉ khi bấm nút checkout
      dispatch(checkoutActions.SHOW_checkout());
      // Chuyển hướng sang checkout page
      navigate('/checkout', { state: { listCart: newData, totalMoney } });
    } catch (err) {
      dispatch(toastActions.SHOW_WARN(err.toString() || 'Checkout failed!'));
    }
  };

  const addCartHandler = async e => {
    e.preventDefault();

    // Nếu chưa đăng nhập: chuyển trang và return
    if (!isAuthenticated) {
      navigate('/login', { state: { oldPath: location.pathname } });
      return;
    }
    const newData = {
      startDate: startDate.toISOString(),
      adultQuantity: +options.adult,
      childQuantity: +options.child,
      babyQuantity: +options.baby,
    };

    try {
      if (options.adult === 0) {
        throw new Error('Vui lòng chọn ít nhất 1 người lớn!');
      }

      const res = await fetch(urlFetch, {
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
        dispatch(toastActions.SHOW_SUCCESS(data.message || 'Fetched success!'));
      } else {
        throw new Error(data.message || 'Fetch failed');
      }
    } catch (err) {
      dispatch(toastActions.SHOW_WARN(err.toString() || 'Add failed!'));
    }
  };

  return (
    <>
      <div id="search-bar" className="wrapSearch mb-2">
        <InputItemCart
          tourData={tourData}
          startDate={startDate}
          setStartDate={setStartDate}
          options={options}
          handleOption={handleOption}
        />
        <div className="wrapFlexItem DetailFormBtn d-flex justify-content-end justify-content-xl-start">
          <button className="btn-private" onClick={checkoutHandler}>
            Đặt ngay
          </button>

          <button className="small" type="button" onClick={addCartHandler}>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
      <div>
        {tourData.count === 0 && (
          <b className="ms-3 text-danger">(Sold out.)</b>
        )}
        {!quantityIsValid && tourData.count !== 0 && (
          <b className="ms-3 text-danger">
            (Tour này chỉ còn nhận {tourData.count} người.)
          </b>
        )}
      </div>
    </>
  );
};

export default DetailForm;
