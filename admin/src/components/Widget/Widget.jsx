import { useState } from 'react';
import { Link } from 'react-router-dom';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import './widget.scss';
import MyModal from 'components/UI/Modal/MyModal';

const Widget = ({ type, amount = 0, dataSub }) => {
  const [modalShow, setModalShow] = useState(false);

  let data;

  //temporary
  // const diff = 20;

  switch (type) {
    case 'user':
      data = {
        title: 'USERS',
        isMoney: false,
        link: 'View all users',
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      };
      break;
    case 'order':
      data = {
        title: 'ORDERS',
        isMoney: false,
        link: 'View all orders',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      };
      break;
    case 'tour':
      data = {
        title: 'TOUR',
        isMoney: false,
        link: 'View all Tours',
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
      };
      break;
    case 'earning':
      data = {
        title: 'EARNINGS',
        isMoney: true,
        link: 'See details',
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={dataSub}
      />
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? amount.toLocaleString('vi-VN') + 'đ' : amount}
        </span>
        {data.isMoney ? (
          <span className="link" onClick={() => setModalShow(true)}>
            {data.link}
          </span>
        ) : (
          <Link to={`/${type}s`} className="link">
            {data.link}
          </Link>
        )}
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
