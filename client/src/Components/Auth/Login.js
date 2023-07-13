import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from 'Components/UI/Input/Input';
import { authActions } from 'store/auth';
import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate(); // Dùng useNavigate() để điều hướng trang
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const location = useLocation();
  const emailState =
    (location.state !== null && location.state.email
      ? location.state.email
      : '') || '';
  const oldPath = location.state !== null ? location.state.oldPath : false;

  const urlLogin = useSelector(state => state.api.urlLogin);

  // lấy value input
  const [authLoading, setAuthLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(emailState);
  const [enteredPassword, setEnteredPassword] = useState('');

  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const passwordChangeHandler = e => setEnteredPassword(e.target.value);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async event => {
    event.preventDefault();
    // console.log(userArr);

    const enteredData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    // Xử lý nếu chưa nhập => focus vào input đó
    if (enteredData.email === '') {
      emailInputRef.current.focus();
      return;
    } else if (enteredData.password === '') {
      passwordInputRef.current.focus();
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch(urlLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enteredData),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setAuthLoading(false);

        // Lấy data từ kq fetch
        const dataLogin = {
          userId: data.user.userId,
          fullName: data.user.fullName,

          // tính lại thời gian hết hạn
          // = thời gian hiện tại login + số tgian tối đa có thể truy cập
          expireTime: new Date().getTime() + data.user.maxAge,
        };

        // cập nhật dữ liệu state Redux bằng action login
        dispatch(authActions.ON_LOGIN(dataLogin));

        // toast thông báo Login thành công (lấy từ store redux)
        dispatch(toastActions.SHOW_SUCCESS(data.message || 'Login success!'));

        if (oldPath) {
          navigate(oldPath);
        } else {
          navigate('/');
        }
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
        <h3 className="fw-bold">Sign In</h3>
        <div className="d-flex justify-content-center pb-5"></div>

        <div className={classes.control}>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            ref={emailInputRef}
          />

          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>{authLoading ? 'Loading...' : 'SIGN IN'}</button>
        </div>

        <div className={classes.toggle}>
          <span>Create an account?</span>
          <button
            type="button"
            onClick={() =>
              navigate('/register', { state: { email: enteredEmail } })
            }
          >
            Sign up
          </button>
          <Link to="/verify-code">Forgot password?</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
