import { useEffect } from 'react';

import ForgotPassword from 'Components/Auth/ForgotPassword';

const ForgotPasswordPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <ForgotPassword />;
};

export default ForgotPasswordPage;
