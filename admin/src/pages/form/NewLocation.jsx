import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const NewLocation = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng

  const [enteredLocationName, setEnteredLocationName] = useState(''); // lưu value input vào state
  const [enteredImg, setEnteredImg] = useState('');
  const [enteredCountryName, setEnteredCountryName] = useState('');

  const locationNameChangeHandler = e => setEnteredLocationName(e.target.value); // handlers
  const imgChangeHandler = e => setEnteredImg(e.target.value);
  const countryNameChangeHandler = e => setEnteredCountryName(e.target.value);

  const locationNameInputRef = useRef(); // dùng useRef() để lấy value input dùng focus()
  const imgInputRef = useRef();
  const countryNameInputRef = useRef();

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
    } else if (enteredCountryName.trim() === '') {
      countryNameInputRef.current.focus();
      return;
    }

    // post new Location Api
    try {
      const res = await fetch(requests.postNewLocation, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enteredLocationName.trim(),
          img: enteredImg.trim(),
          country: enteredCountryName.trim(),
        }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Create Location successfully!')); // toast
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

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">Add New Location</div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="locationName">Location Name</label>
            <input
              id="locationName"
              type="text"
              placeholder="Enter Location Name"
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
            <label htmlFor="countryName">Country Name</label>
            <input
              id="countryName"
              type="text"
              placeholder="Enter Country Name"
              value={enteredCountryName}
              onChange={countryNameChangeHandler}
              ref={countryNameInputRef}
            />
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/locations')}
          >
            Cancel
          </button>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default NewLocation;
