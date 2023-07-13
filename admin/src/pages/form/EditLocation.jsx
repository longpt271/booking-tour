import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const EditLocation = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng
  const locationUse = useLocation(); // dùng useLocation lấy state khi navigate
  const locationState = locationUse.state || {};

  // lưu value input vào state
  const [enteredLocationName, setEnteredLocationName] = useState(
    locationState.name || ''
  );
  const [enteredImg, setEnteredImg] = useState(locationState.img || '');
  const [enteredCountry, setEnteredCountry] = useState(
    locationState.country || ''
  );

  // handlers
  const locationNameChangeHandler = e => setEnteredLocationName(e.target.value);
  const imgChangeHandler = e => setEnteredImg(e.target.value);
  const countryChangeHandler = e => setEnteredCountry(e.target.value);

  // dùng useRef() để lấy value input dùng focus()
  const locationNameInputRef = useRef();
  const imgInputRef = useRef();
  const countryInputRef = useRef();

  // xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredLocationName.trim() === '') {
      locationNameInputRef.current.focus();
      return;
    } else if (enteredImg.trim() === '') {
      imgInputRef.current.focus();
      return;
    } else if (enteredCountry.trim() === '') {
      countryInputRef.current.focus();
      return;
    }

    const newLocation = {
      name: enteredLocationName.trim(),
      img: enteredImg.trim(),
      country: enteredCountry.trim(),
    };

    // post update location
    try {
      const res = await fetch(requests.postEditLocation, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ locationId: locationState._id, ...newLocation }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Update Location successfully!')); // toast
        navigate('/locations'); // điều hướng
      } else {
        const data = await res.json();
        dispatch(
          toastActions.SHOW_WARN(
            data.message ? data.message : 'Something error!'
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormHandler = () => {
    setEnteredLocationName('');
    setEnteredImg('');
    setEnteredCountry('');
  };
  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">
        Update Location
        <small className="text-muted"> {locationState._id}</small>
      </div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="locationName">Location</label>
            <input
              id="locationName"
              type="text"
              placeholder="Enter Location"
              value={enteredLocationName}
              onChange={locationNameChangeHandler}
              ref={locationNameInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="img">Img</label>
            <input
              id="img"
              type="text"
              placeholder="Enter Img url"
              value={enteredImg}
              onChange={imgChangeHandler}
              ref={imgInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Enter Country"
              value={enteredCountry}
              onChange={countryChangeHandler}
              ref={countryInputRef}
            />
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/locations')}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => resetFormHandler()}
          >
            Reset
          </button>
          <button>Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditLocation;
