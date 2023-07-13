import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './Login.module.css';
import Input from 'Components/UI/Input/Input';
import { toastActions } from 'store/toast';

const VerifyCode = () => {
  const navigate = useNavigate(); // Dùng useNavigate() để điều hướng trang
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux

  const urlVerifyCode = useSelector(state => state.api.urlVerifyCode);

  // lấy value input
  const [authLoading, setAuthLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const emailInputRef = useRef();

  const submitHandler = async event => {
    event.preventDefault();

    const enteredData = { email: enteredEmail };
    // Xử lý nếu chưa nhập => focus vào input đó
    if (enteredData.email === '') {
      emailInputRef.current.focus();
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch(urlVerifyCode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enteredData),
      });

      const data = await res.json();
      if (res.ok) {
        setAuthLoading(false);

        // toast
        dispatch(
          toastActions.SHOW_SUCCESS(data.message || 'Sent verify code success!')
        );

        navigate('/forgot-password', { state: enteredData });
      } else {
        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Fetch failed');
        }
      }
    } catch (error) {
      setAuthLoading(false);
      dispatch(toastActions.SHOW_WARN(error.toString() || 'Fetch failed!'));
    }
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Get Verify code</h3>

        <div className={classes.control}>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            ref={emailInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>{authLoading ? 'Loading...' : 'SEND'}</button>
        </div>
      </form>
    </section>
  );
};

export default VerifyCode;
