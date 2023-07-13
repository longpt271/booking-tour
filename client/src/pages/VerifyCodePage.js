import { useEffect } from 'react';

import VerifyCode from 'Components/Auth/VerifyCode';

const VerifyCodePage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <VerifyCode />;
};

export default VerifyCodePage;
