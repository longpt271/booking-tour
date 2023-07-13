import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'Components/UI/Input/Input';
import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Register = () => {
  const navigate = useNavigate(); // Dùng useNavigate() để điều hướng trang
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const location = useLocation();
  const emailState = (location.state && location.state.email) || '';

  const urlRegister = useSelector(state => state.api.urlRegister);

  // lấy value input
  const [authLoading, setAuthLoading] = useState(false);
  const [enteredFullName, setEnteredFullName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState(emailState);
  const [enteredPhone, setEnteredPhone] = useState('');

  // Value input change handlers
  const fullNameChangeHandler = e => setEnteredFullName(e.target.value);
  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const phoneChangeHandler = e => setEnteredPhone(e.target.value);

  // dùng useRef() để lấy value input
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  // Xử lý ấn submit form
  const submitHandler = async event => {
    event.preventDefault();

    // optional: Add validation
    const enteredData = {
      fullName: enteredFullName,
      email: enteredEmail,
      phone: enteredPhone,
    };

    // Validate dữ liệu
    if (enteredData.fullName === '') {
      fullNameInputRef.current.focus();
      return;
    } else if (enteredData.email === '') {
      emailInputRef.current.focus();
      return;
    } else if (enteredData.phone === '') {
      phoneInputRef.current.focus();
      return;
    } else if (enteredData.phone.length < 10 || enteredData.phone.length > 11) {
      dispatch(toastActions.SHOW_WARN('Phone needs 10 or 11 numbers!'));
      phoneInputRef.current.focus();
      return;
    }

    // fetch create user
    setAuthLoading(true);
    try {
      const res = await fetch(urlRegister, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enteredData),
      });

      const data = await res.json();
      if (res.ok) {
        setAuthLoading(false);

        // toast thông báo Login thành công
        dispatch(
          toastActions.SHOW_SUCCESS(
            data.message.toString() || 'Register success!'
          )
        );

        // Chuyển trang
        navigate('/login', { state: { email: enteredEmail } });
      } else {
        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Fetch failed');
        }
      }
    } catch (error) {
      // console.log(error);
      setAuthLoading(false);
      dispatch(toastActions.SHOW_WARN(error.toString() || 'Register failed!'));
    }
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3 className="fw-bold">Sign Up</h3>

        <div className={classes.control}>
          <Input
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={enteredFullName}
            onChange={fullNameChangeHandler}
            ref={fullNameInputRef}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            ref={emailInputRef}
          />
          <Input
            id="phone"
            type="number"
            placeholder="Phone"
            value={enteredPhone}
            onChange={phoneChangeHandler}
            ref={phoneInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>{authLoading ? 'Loading...' : 'SIGN UP'}</button>
        </div>

        <div className={classes.toggle}>
          <span>Login?</span>
          <button
            type="button"
            onClick={() =>
              navigate('/login', { state: { email: enteredEmail } })
            }
          >
            Click
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
