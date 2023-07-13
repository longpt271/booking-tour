import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const EditUser = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng
  const location = useLocation(); // dùng useLocation lấy state khi navigate
  const userState = useMemo(() => location.state || {}, [location.state]);

  // lưu value input vào state
  const [enteredEmail] = useState(userState.email);
  const [enteredFullName, setEnteredFullName] = useState(
    userState.fullName || ''
  );
  const [enteredPhone, setEnteredPhone] = useState(userState.phone || '');
  const [enteredAddress, setEnteredAddress] = useState(userState.address || '');

  // handlers
  const fullNameChangeHandler = e => setEnteredFullName(e.target.value);
  const phoneChangeHandler = e => setEnteredPhone(e.target.value);
  const addressChangeHandler = e => setEnteredAddress(e.target.value);

  // dùng useRef() để lấy value input dùng focus()
  const fullNameInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();

  // xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredFullName.trim() === '') {
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
      userId: userState._id,
      fullName: enteredFullName.trim(),
      phone: enteredPhone,
      address: enteredAddress.trim(),
    };

    // post update user
    try {
      const res = await fetch(requests.urlUserInfo, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Update User successfully!')); // toast
        navigate('/users'); // điều hướng
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

  const urlResetPassword = requests.patchResetPassword;
  const handleResetPassword = useCallback(() => {
    confirmAlert({
      message:
        'This action will reset the old password and send the new password to the user. Continue ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            // fetch delete hotel/Room
            try {
              const res = await fetch(urlResetPassword + '/' + userState._id, {
                method: 'PATCH',
                credentials: 'include',
              });

              const data = await res.json();
              if (res.ok) {
                dispatch(
                  toastActions.SHOW_SUCCESS(
                    data.message ? data.message : 'Reset Password Successful!'
                  )
                ); // toast
              } else {
                dispatch(
                  toastActions.SHOW_WARN(
                    data.message ? data.message : 'Something error!'
                  )
                );
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        { label: 'No' },
      ],
    });
  }, [urlResetPassword, userState, dispatch]);

  const resetFormHandler = () => {
    setEnteredFullName('');
    setEnteredPhone('');
    setEnteredAddress('');
  };

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">
        Update User
        <small className="text-muted"> {userState._id}</small>
      </div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your email address"
              value={enteredEmail}
              disabled
            />
          </div>
          <div className="formInput">
            <label htmlFor="password">Password</label>
            <div className="d-flex">
              <input
                id="password"
                type="password"
                placeholder="your password address"
                value="******"
                disabled
              />
              <button
                type="button"
                className="m-0 bg-transparent text-secondary"
                style={{ width: '200px' }}
                onClick={handleResetPassword}
              >
                <u> Reset password?</u>
              </button>
            </div>
          </div>
          <div className="formInput">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={enteredFullName}
              onChange={fullNameChangeHandler}
              ref={fullNameInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Your phone number"
              value={enteredPhone}
              onChange={phoneChangeHandler}
              ref={phoneInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Your Address"
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

export default EditUser;
