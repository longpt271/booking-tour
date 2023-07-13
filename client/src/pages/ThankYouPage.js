import { useEffect } from 'react';

import ThankYou from 'Components/ThankYouPage/ThankYou';

const ThankYouPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <ThankYou />;
};

export default ThankYouPage;
