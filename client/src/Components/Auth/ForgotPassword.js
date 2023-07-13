import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import classes from './Login.module.css';
import Input from 'Components/UI/Input/Input';
import { toastActions } from 'store/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const navigate = useNavigate(); // Dùng useNavigate() để điều hướng trang
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const location = useLocation();
  const emailState = location.state ? location.state.email : '';

  const urlForgotPassword = useSelector(state => state.api.urlForgotPassword);

  // state input
  const [authLoading, setAuthLoading] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const codeChangeHandler = e => setEnteredCode(e.target.value);
  const newPasswordChangeHandler = e => setNewPassword(e.target.value);
  const confirmPasswordChangeHandler = e => setConfirmPassword(e.target.value);
  const codeInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);

  const submitHandler = async event => {
    event.preventDefault();

    // Xử lý nếu chưa nhập => focus vào input đó
    if (enteredCode.trim() === '') {
      codeInputRef.current.focus();
      return;
    } else if (newPassword.trim() === '') {
      newPasswordInputRef.current.focus();
      return;
    } else if (confirmPassword.trim() === '') {
      confirmPasswordInputRef.current.focus();
      return;
    }

    setAuthLoading(true);
    const enteredData = {
      verifyCode: enteredCode,
      email: emailState,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const res = await fetch(urlForgotPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enteredData),
      });

      const data = await res.json();
      if (res.ok) {
        setAuthLoading(false);

        // toast
        dispatch(
          toastActions.SHOW_SUCCESS(data.message || 'Change password success!')
        );

        navigate('/login');
      } else {
        throw new Error(data.message || 'Fetch failed');
      }
    } catch (error) {
      setAuthLoading(false);
      dispatch(toastActions.SHOW_WARN(error.toString() || 'Fetch failed!'));
    }
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Set New password</h3>

        <div className={classes.control}>
          <Input
            id="code"
            type="text"
            placeholder="Enter your verify code is sent in email"
            value={enteredCode}
            onChange={codeChangeHandler}
            ref={codeInputRef}
          />

          <div className="d-flex position-relative">
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={newPasswordChangeHandler}
              ref={newPasswordInputRef}
            />
            <button
              className={classes.showPassBtn}
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>

          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            ref={confirmPasswordInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>{authLoading ? 'Loading...' : 'SEND'}</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
