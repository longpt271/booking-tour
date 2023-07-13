import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './Components/layout/Layout';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';

// Thêm Lazy Loading
const Home = React.lazy(() => import('./pages/HomePage'));
const Shop = React.lazy(() => import('./pages/ShopPage'));
const Detail = React.lazy(() => import('./pages/DetailPage'));
const Cart = React.lazy(() => import('./pages/CartPage'));
const Order = React.lazy(() => import('./pages/OrderPage'));
const OrderDetail = React.lazy(() => import('./pages/OrderDetailPage'));
const Checkout = React.lazy(() => import('./pages/CheckoutPage'));
const ThankYou = React.lazy(() => import('./pages/ThankYouPage'));
const Profile = React.lazy(() => import('./pages/ProfilePage'));
const ChangePassword = React.lazy(() => import('./pages/ChangePasswordPage'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const Register = React.lazy(() => import('./pages/RegisterPage'));
const VerifyCode = React.lazy(() => import('./pages/VerifyCodePage'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPasswordPage'));

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    // 2. Tạo Router cho ứng dụng bằng react-router-dom@6
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/detail/:tourId" element={<Detail />} />
          <Route path="/login" element={<Login />} />

          {isAuthenticated ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:orderId" element={<OrderDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thankyou" element={<ThankYou />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/verify-code" element={<VerifyCode />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </>
          )}

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
