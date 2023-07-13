import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const EditDiscount = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng
  const location = useLocation(); // dùng useLocation lấy state khi navigate
  const discountState = location.state || {};

  const [enteredDiscountName, setEnteredDiscountName] = useState(
    discountState.name || ''
  ); // lưu value input vào state
  const [enteredPercentOff, setEnteredPercentOff] = useState(
    discountState.percentOff || ''
  );
  const [enteredStatus, setEnteredStatus] = useState(discountState.status || 0);

  const discountNameChangeHandler = e => setEnteredDiscountName(e.target.value); // handlers
  const percentOffChangeHandler = e => setEnteredPercentOff(+e.target.value);
  const statusChangeHandler = e => setEnteredStatus(+e.target.value);

  const discountNameInputRef = useRef(); // dùng useRef() để lấy value input dùng focus()
  const percentOffInputRef = useRef();
  const statusInputRef = useRef();

  // xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredDiscountName.trim() === '') {
      discountNameInputRef.current.focus();
      return;
    } else if (enteredPercentOff === '') {
      percentOffInputRef.current.focus();
      return;
    } else if (enteredStatus === '') {
      statusInputRef.current.focus();
      return;
    }

    const newDiscount = {
      name: enteredDiscountName.trim(),
      percentOff: enteredPercentOff,
      status: enteredStatus,
    };

    // post update discount
    try {
      const res = await fetch(requests.postEditDiscount, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ discountId: discountState._id, ...newDiscount }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Update Discount successfully!')); // toast
        navigate('/discounts'); // điều hướng
      } else {
        const data = await res.json();
        dispatch(
          toastActions.SHOW_WARN(
            data.message ? data.message : 'Something error!'
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormHandler = () => {
    setEnteredDiscountName('');
    setEnteredPercentOff(0);
    setEnteredStatus(0);
  };

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">
        Update Discount
        <small className="text-muted"> {discountState._id}</small>
      </div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="discountName">Discount Name</label>
            <input
              id="discountName"
              type="text"
              placeholder="Enter Discount Name"
              value={enteredDiscountName}
              onChange={discountNameChangeHandler}
              ref={discountNameInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="percentOff">Percent Off</label>
            <input
              id="percentOff"
              type="number"
              placeholder="Enter Percent Off"
              value={enteredPercentOff}
              onChange={percentOffChangeHandler}
              ref={percentOffInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={enteredStatus}
              onChange={statusChangeHandler}
              ref={statusInputRef}
            >
              <option value="1">Bật</option>
              <option value="0">Tắt</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/discounts')}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => resetFormHandler()}
          >
            Reset
          </button>
          <button>Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditDiscount;
