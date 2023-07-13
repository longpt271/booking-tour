import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Detail from 'Components/DetailPage/Detail';

const DetailPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Detail />;
};

export default DetailPage;
