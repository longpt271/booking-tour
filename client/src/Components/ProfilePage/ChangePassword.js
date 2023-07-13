import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { toastActions } from 'store/toast';
import Image from 'img/Image';
import useHttp from 'hooks/use-http';
import HeaderPage from 'Components/UI/HeaderPage/HeaderPage';

const ChangePassword = () => {
  const dispatch = useDispatch();

  // State lưu input
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFullName, setEnteredFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [enteredMess, setEnteredMess] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // hàm handler State change
  const oldPasswordChangeHandler = e => setOldPassword(e.target.value);
  const newPasswordChangeHandler = e => setNewPassword(e.target.value);
  const confirmPasswordChangeHandler = e => setConfirmPassword(e.target.value);
  const toggleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);

  const urlUserInfo = useSelector(state => state.api.urlUserInfo);
  const urlChangePassword = useSelector(state => state.api.urlChangePassword);
  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      setEnteredEmail(data.email);
      setEnteredFullName(data.fullName);
    };
    fetchData({ url: urlUserInfo }, transformData);
  }, [fetchData, urlUserInfo]);

  const submitHandler = async e => {
    e.preventDefault();

    try {
      const res = await fetch(urlChangePassword, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(
          toastActions.SHOW_SUCCESS(data.message || 'Update password success!')
        );

        handleResetForm();
      } else {
        if (data.message) {
          data.message && setEnteredMess(data.message);
          throw new Error(data.message);
        } else {
          throw new Error('Fetch failed');
        }
      }
    } catch (err) {
      dispatch(toastActions.SHOW_WARN(err.toString() || 'Fetch failed!'));
    }
  };

  const handleResetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setEnteredMess('');
  };

  return (
    <div className="rounded bg-white mb-5">
      <HeaderPage title="Profile" subTitle="Change Password" />

      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-2 py-md-5">
            <img
              className="rounded-circle mt-md-5"
              width="150px"
              src={Image.profileUser}
              alt="avt"
            />
            <span className="font-weight-bold">
              {enteredFullName || 'Long Phạm'}
            </span>
            <span className="text-black-50">{enteredEmail || 'longpt27'}</span>
            <Link to="/profile">Profile Settings</Link>
          </div>
        </div>

        <div className="col-md-9 border-right">
          <form onSubmit={submitHandler} className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Change Your Password</h4>
            </div>

            <div className="row mt-2 mb-4">
              <div className="col-12 pb-3">
                <label htmlFor="oldPassword" className="labels">
                  Your Old Password
                </label>
                <input
                  id="oldPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your oldPassword"
                  value={oldPassword}
                  onChange={oldPasswordChangeHandler}
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="newPassword" className="labels">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your New Password"
                  value={newPassword}
                  onChange={newPasswordChangeHandler}
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="confirmPassword" className="labels">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your Confirm Password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                />
              </div>
            </div>

            {enteredMess && <p className="text-danger">{enteredMess}</p>}

            <div className="text-center">
              <button
                className="btn btn-secondary me-2"
                type="button"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>

              <button className="btn btn-primary profile-button">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
