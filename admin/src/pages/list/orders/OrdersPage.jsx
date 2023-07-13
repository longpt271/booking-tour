import { useContext } from 'react';

import ApiContext from 'context/ApiContext';
import Layout from 'components/layout/Layout';
import Orders from 'components/List/Orders/Orders';

const OrdersPage = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api
  const urlSearchFetch = requests.getOrders; // url Orders
  return (
    <Layout>
      <Orders urlSearchFetch={urlSearchFetch} />
    </Layout>
  );
};

export default OrdersPage;
