import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// import react-toastify để tạo thông báo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import css confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
// Import css react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

import classes from './Layout.module.css';
import { authActions } from 'store/auth';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = props => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Xử lý auto logout dựa vào expireTime
  const expireTime = useSelector(state => state.auth.expireTime);
  useEffect(() => {
    const isTimeout = new Date().getTime() > parseInt(expireTime);
    // console.log(new Date().getTime(), parseInt(expireTime));
    if (expireTime && isTimeout) {
      dispatch(authActions.ON_LOGOUT());
    }
  }, [dispatch, expireTime]);

  const containerCssArr = [
    '/',
    '/login',
    '/register',
    '/verify-code',
    '/forgot-password',
  ];
  const containerCss =
    !containerCssArr.includes(location.pathname) &&
    !location.pathname.startsWith('/detail')
      ? 'container'
      : '';

  const isLoginPage = [
    '/login',
    '/register',
    '/verify-code',
    '/forgot-password',
  ].includes(location.pathname);

  return (
    <>
      <NavBar />
      <main className={classes.main + ' ' + containerCss}>
        {props.children}
      </main>
      {!isLoginPage && <Footer />}
      <ToastContainer />
    </>
  );
};

export default Layout;
