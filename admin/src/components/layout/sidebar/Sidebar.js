import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import PlaceIcon from '@mui/icons-material/Place';
import DiscountIcon from '@mui/icons-material/Discount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Import confirm modal
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './sidebar.scss';
import { authActions } from 'store/auth';
import { toastActions } from 'store/toast';
import { darkModeActions } from 'store/darkMode';

const Sidebar = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handlerLogout = () => {
    confirmAlert({
      message: 'Confirm to logout',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(authActions.ON_LOGOUT());
            dispatch(toastActions.SHOW_SUCCESS('Logout success!'));
            navigate('/auth');
          },
        },
        {
          label: 'No',
          onClick: () => dispatch(toastActions.SHOW_WARN('cancelled!')),
        },
      ],
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Link to="/">
          <span className="logo">Admin Page</span>
        </Link>
      </div>
      <hr />
      <div className="sidebar-center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          {isAuth && isAdmin && (
            <>
              <p className="title">LISTS</p>
              <Link to="/orders">
                <li>
                  <ReceiptIcon className="icon" />
                  <span>Orders</span>
                </li>
              </Link>
              <Link to="/tours">
                <li>
                  <StoreIcon className="icon" />
                  <span>Tours</span>
                </li>
              </Link>
              <Link to="/categories">
                <li>
                  <CategoryIcon className="icon" />
                  <span>Categories</span>
                </li>
              </Link>
              <Link to="/locations">
                <li>
                  <PlaceIcon className="icon" />
                  <span>Locations</span>
                </li>
              </Link>
              <Link to="/discounts">
                <li>
                  <DiscountIcon className="icon" />
                  <span>Discounts</span>
                </li>
              </Link>
              <Link to="/users">
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
            </>
          )}

          <p className="title">USER</p>
          <li onClick={handlerLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div
          className="colorOption"
          onClick={() => dispatch(darkModeActions.HIDE_darkMode())}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch(darkModeActions.SHOW_darkMode())}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
