import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './home.scss';
import { toastActions } from 'store/toast';
import ApiContext from 'context/ApiContext';
import Layout from 'components/layout/Layout';
import Chart from 'components/chart/Chart';
import Widget from 'components/Widget/Widget';
import Orders from 'components/List/Orders/Orders';

const Home = () => {
  const dispatch = useDispatch();
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api
  const urlDash = requests.getDashboard; // url Users or Transactions
  const urlSearchFetch = requests.getOrdersWaiting; // url Orders waiting

  const [dataDash, setDataDash] = useState([]);
  const [earning, setEarning] = useState(0);
  // func get data Api
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch(urlDash, { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setDataDash(data);
        data.totalEarning && setEarning(data.totalEarning);
      } else {
        if (data.message) {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      dispatch(toastActions.SHOW_WARN(error.toString() || 'Login failed!'));
    }
  }, [urlDash, dispatch]);
  useEffect(() => {
    fetchDashboard(); // fetch data dashboard
  }, [fetchDashboard]);

  // Hàm change earning khi thay đổi trạng thái của order
  const changeEarning = amount => {
    setEarning(prevState => prevState + amount);
  };

  return (
    <Layout className="home">
      <div className="widgets">
        <Widget type="user" amount={dataDash.totalUser} />
        <Widget type="order" amount={dataDash.totalOrder} />
        <Widget type="tour" amount={dataDash.totalTour} />
        <Widget
          type="earning"
          amount={earning}
          dataSub={dataDash.monthlyRevenues}
        />
      </div>
      <div className="charts">
        <Chart
          title="Last 6 Months (Earnings)"
          dataSub={dataDash.monthlyRevenues}
        />
      </div>
      <div className="listContainer">
        <Orders
          urlSearchFetch={urlSearchFetch}
          onChangeEarning={changeEarning}
        />
      </div>
    </Layout>
  );
};

export default Home;
