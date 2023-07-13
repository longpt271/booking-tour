import { useEffect } from 'react';

import ChangePassword from 'Components/ProfilePage/ChangePassword';

const ChangePasswordPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <ChangePassword />;
};

export default ChangePasswordPage;
