import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const NewUser = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api
  const dispatch = useDispatch();
  const navigate = useNavigate(); // navigate điều hướng

  // lưu value input vào state
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFullName, setEnteredFullName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');

  // handlers
  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const fullNameChangeHandler = e => setEnteredFullName(e.target.value);
  const phoneChangeHandler = e => setEnteredPhone(e.target.value);
  const addressChangeHandler = e => setEnteredAddress(e.target.value);

  // dùng useRef() để lấy value input dùng focus()
  const emailInputRef = useRef();
  const fullNameInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();

  // Xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredEmail.trim() === '') {
      emailInputRef.current.focus();
      return;
    } else if (enteredFullName.trim() === '') {
      fullNameInputRef.current.focus();
      return;
    } else if (enteredPhone === '') {
      phoneInputRef.current.focus();
      return;
    } else if (enteredAddress.trim() === '') {
      addressInputRef.current.focus();
      return;
    }

    const newUser = {
      email: enteredEmail.trim(),
      fullName: enteredFullName.trim(),
      phone: enteredPhone,
      address: enteredAddress.trim(),
    };

    // console.log(newUser);

    // put new User
    try {
      const res = await fetch(requests.putSignUp, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(
          toastActions.SHOW_SUCCESS(data.message || 'Add new user successful!')
        );
        // move page
        navigate('/users');
      } else {
        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Fetch failed');
        }
      }
    } catch (error) {
      dispatch(
        toastActions.SHOW_WARN(error.toString() || 'Add new user failed!')
      );
    }
  };

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">Add New User</div>

      <div className="bottom">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={enteredEmail}
              onChange={emailChangeHandler}
              ref={emailInputRef}
            />
          </div>
          <div className="formInput">
            <label>Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={enteredFullName}
              onChange={fullNameChangeHandler}
              ref={fullNameInputRef}
            />
          </div>
          <div className="formInput">
            <label>Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Enter your phone number"
              value={enteredPhone}
              onChange={phoneChangeHandler}
              ref={phoneInputRef}
            />
          </div>
          <div className="formInput">
            <label>Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={enteredAddress}
              onChange={addressChangeHandler}
              ref={addressInputRef}
            />
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/users')}
          >
            Cancel
          </button>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default NewUser;
