import { useEffect } from 'react';

import ShopList from 'Components/ShopPage/ShopList';

const ShopPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <ShopList />;
};

export default ShopPage;
