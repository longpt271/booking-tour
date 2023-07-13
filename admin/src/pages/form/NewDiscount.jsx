import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const NewDiscount = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng

  const [enteredDiscountName, setEnteredDiscountName] = useState(''); // lưu value input vào state
  const [enteredPercentOff, setEnteredPercentOff] = useState('');
  const [enteredStatus, setEnteredStatus] = useState(0);

  const discountNameChangeHandler = e => setEnteredDiscountName(e.target.value); // handlers
  const percentOffChangeHandler = e => setEnteredPercentOff(e.target.value);
  const statusChangeHandler = e => setEnteredStatus(e.target.value);

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

    // post new Discount Api
    try {
      const res = await fetch(requests.postNewDiscount, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enteredDiscountName.trim(),
          percentOff: enteredPercentOff,
          status: enteredStatus,
        }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Create Discount successfully!')); // toast
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

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">Add New Discount</div>

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
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default NewDiscount;
