import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './style/dark.scss';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';

// import react-toastify để tạo thông báo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Thêm Lazy Loading
const Auth = React.lazy(() => import('pages/auth/Auth'));
const Home = React.lazy(() => import('pages/home/Home'));
const Categories = React.lazy(() =>
  import('pages/list/categories/CategoriesPage')
);
const Discounts = React.lazy(() =>
  import('pages/list/discounts/DiscountsPage')
);
const Locations = React.lazy(() =>
  import('pages/list/locations/LocationsPage')
);
const Tours = React.lazy(() => import('pages/list/tours/ToursPage'));
const Users = React.lazy(() => import('pages/list/users/UsersPage'));
const Orders = React.lazy(() => import('pages/list/orders/OrdersPage'));
const OrderDetail = React.lazy(() =>
  import('pages/list/orders/OrderDetailPage')
);

const UserInfo = React.lazy(() => import('components/UserInfo/UserInfo'));

const NewUser = React.lazy(() => import('pages/form/NewUser'));
const NewTour = React.lazy(() => import('pages/form/NewTour'));
const NewCategory = React.lazy(() => import('pages/form/NewCategory'));
const NewLocation = React.lazy(() => import('pages/form/NewLocation'));
const NewDiscount = React.lazy(() => import('pages/form/NewDiscount'));

const EditUser = React.lazy(() => import('pages/form/EditUser'));
const EditUserInfo = React.lazy(() => import('pages/form/EditUserInfo'));
const EditTour = React.lazy(() => import('pages/form/EditTour'));
const EditCategory = React.lazy(() => import('pages/form/EditCategory'));
const EditLocation = React.lazy(() => import('pages/form/EditLocation'));
const EditDiscount = React.lazy(() => import('pages/form/EditDiscount'));

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const isChatStaff = useSelector(state => state.auth.isChatStaff);
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  // console.log(isAuth);

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            {/* các route mà 'admin' có thể truy cập */}
            {isAuth && isAdmin && (
              <Route path="/">
                <Route index element={<Home />} />

                <Route path="user-info">
                  <Route index element={<UserInfo />} />
                  <Route path="edit" element={<EditUserInfo />} />
                </Route>

                <Route path="orders">
                  <Route index element={<Orders />} />
                  <Route path="find/:orderId" element={<OrderDetail />} />
                </Route>
                <Route path="tours">
                  <Route index element={<Tours />} />
                  <Route path="new" element={<NewTour />} />
                  <Route path="edit/:tourId" element={<EditTour />} />
                </Route>
                <Route path="categories">
                  <Route index element={<Categories />} />
                  <Route path="new" element={<NewCategory />} />
                  <Route path="edit/:categoryId" element={<EditCategory />} />
                </Route>
                <Route path="locations">
                  <Route index element={<Locations />} />
                  <Route path="new" element={<NewLocation />} />
                  <Route path="edit/:locationId" element={<EditLocation />} />
                </Route>
                <Route path="discounts">
                  <Route index element={<Discounts />} />
                  <Route path="new" element={<NewDiscount />} />
                  <Route path="edit/:discountId" element={<EditDiscount />} />
                </Route>
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path="new" element={<NewUser />} />
                  <Route path="edit/:userId" element={<EditUser />} />
                </Route>

                <Route path="*" element={<Navigate replace to="/" />} />
              </Route>
            )}

            {/* các route mà 'chat-staff' có thể truy cập */}
            {isAuth && isChatStaff && (
              <Route path="/">
                <Route index element={<Home />} />

                <Route path="orders/find/:orderId" element={<OrderDetail />} />

                <Route path="user-info">
                  <Route index element={<UserInfo />} />
                  <Route path="edit" element={<EditUserInfo />} />
                </Route>

                <Route path="*" element={<Navigate replace to="/" />} />
              </Route>
            )}

            {!isAuth && (
              <>
                <Route path="auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
