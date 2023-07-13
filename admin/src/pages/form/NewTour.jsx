import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';
import Layout from 'components/layout/Layout';
import ListCategories from './ListCategories';
import ListLocations from './ListLocations';
import ListDiscounts from './ListDiscounts';
import UploadImages from './UploadImages';

const NewTour = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng

  // lưu value input vào state
  const [enteredTourName, setEnteredTourName] = useState('');
  const [enteredTime, setEnteredTime] = useState(0);
  const [enteredCount, setEnteredCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [enteredAdultPrice, setEnteredAdultPrice] = useState('');
  const [enteredChildPrice, setEnteredChildPrice] = useState('');
  const [enteredBabyPrice, setEnteredBabyPrice] = useState('');
  const [enteredImg1, setEnteredImg1] = useState('');
  const [enteredImg2, setEnteredImg2] = useState('');
  const [enteredImg3, setEnteredImg3] = useState('');
  const [enteredImg4, setEnteredImg4] = useState('');
  const [enteredDesc, setEnteredDesc] = useState('');
  const [enteredWarn, setEnteredWarn] = useState('');

  // handlers
  const tourNameChangeHandler = e => setEnteredTourName(e.target.value);
  const timeChangeHandler = e => setEnteredTime(+e.target.value);
  const countChangeHandler = e => setEnteredCount(+e.target.value);
  const categoryChangeHandler = data => setSelectedCategories(data);
  const locationChangeHandler = data => setSelectedLocations(data);
  const discountChangeHandler = data => setSelectedDiscount(data);
  const adultPriceChangeHandler = e => setEnteredAdultPrice(+e.target.value);
  const childPriceChangeHandler = e => setEnteredChildPrice(+e.target.value);
  const babyPriceChangeHandler = e => setEnteredBabyPrice(+e.target.value);
  const img1ChangeHandler = e => setEnteredImg1(e.target.value);
  const img2ChangeHandler = e => setEnteredImg2(e.target.value);
  const img3ChangeHandler = e => setEnteredImg3(e.target.value);
  const img4ChangeHandler = e => setEnteredImg4(e.target.value);
  const descChangeHandler = e => setEnteredDesc(e.target.value);
  const warnChangeHandler = e => setEnteredWarn(e.target.value);

  // dùng useRef() để lấy value input dùng focus()
  const tourNameInputRef = useRef();
  const timeInputRef = useRef();
  const countInputRef = useRef();
  const categorySelectRef = useRef();
  const locationSelectRef = useRef();
  const adultPriceInputRef = useRef();
  const childPriceInputRef = useRef();
  const babyPriceInputRef = useRef();
  const img1InputRef = useRef();
  const img2InputRef = useRef();
  const img3InputRef = useRef();
  const img4InputRef = useRef();
  const descInputRef = useRef();
  const warnInputRef = useRef();

  // Fetch data input khi editing

  // xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredTourName.trim() === '') {
      tourNameInputRef.current.focus();
      return;
    } else if (enteredTime === '') {
      timeInputRef.current.focus();
      return;
    } else if (selectedCategories?.length === 0) {
      categorySelectRef.current.focus();
      return;
    } else if (selectedLocations?.length === 0) {
      locationSelectRef.current.focus();
      return;
    } else if (enteredAdultPrice < 1000) {
      adultPriceInputRef.current.focus();
      dispatch(toastActions.SHOW_WARN('Adult Price nên >= 1.000đ'));
      return;
    } else if (enteredChildPrice < 1000) {
      childPriceInputRef.current.focus();
      dispatch(toastActions.SHOW_WARN('Child Price nên >= 1.000đ'));
      return;
    }
    const fields = [
      { value: enteredBabyPrice, ref: babyPriceInputRef },
      { value: enteredImg1.trim(), ref: img1InputRef },
      { value: enteredImg2.trim(), ref: img2InputRef },
      { value: enteredImg3.trim(), ref: img3InputRef },
      { value: enteredImg4.trim(), ref: img4InputRef },
      { value: enteredDesc.trim(), ref: descInputRef },
      { value: enteredWarn.trim(), ref: warnInputRef },
    ];
    for (const field of fields) {
      if (field.value === '') {
        field.ref.current.focus();
        return;
      }
    }

    const newCategories = selectedCategories.map(cat => cat.value);
    const newLocations = selectedLocations.map(loc => loc.value);
    const newDiscountId = selectedDiscount && selectedDiscount.value;

    const newTour = {
      name: enteredTourName.trim(),
      time: enteredTime,
      count: enteredCount,
      category: newCategories,
      locationStart: '711111111111111111111111',
      location: newLocations,
      discountId: newDiscountId,
      adultPrice: enteredAdultPrice,
      childPrice: enteredChildPrice,
      babyPrice: enteredBabyPrice,
      img1: enteredImg1.trim(),
      img2: enteredImg2.trim(),
      img3: enteredImg3.trim(),
      img4: enteredImg4.trim(),
      desc: enteredDesc.trim(),
      warn: enteredWarn.trim(),
    };

    // console.log(newTour);

    // post new Tour Api
    try {
      const res = await fetch(requests.postNewTour, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTour),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Create Tour successfully!')); // toast
        navigate('/tours'); // điều hướng
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

  const handleUploadComplete = urls => {
    setEnteredImg1(urls[0]);
    setEnteredImg2(urls[1]);
    setEnteredImg3(urls[2]);
    setEnteredImg4(urls[3]);
  };

  return (
    <Layout className="my-basic-form">
      <div className="top fw-bold">Add New Tour</div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="tourName">Tour Name</label>
            <input
              id="tourName"
              type="text"
              placeholder="Enter Tour Name"
              value={enteredTourName}
              onChange={tourNameChangeHandler}
              ref={tourNameInputRef}
            />
          </div>

          <div className="row">
            <div className="formInput col">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="number"
                min="0"
                placeholder="Enter Time"
                value={enteredTime}
                onChange={timeChangeHandler}
                ref={timeInputRef}
              />
            </div>
            <div className="formInput col">
              <label htmlFor="count">Count</label>
              <input
                id="count"
                type="number"
                min="0"
                placeholder="Enter Count"
                value={enteredCount}
                onChange={countChangeHandler}
                ref={countInputRef}
              />
            </div>
          </div>

          <ListCategories
            selectedItems={selectedCategories}
            handleSelect={categoryChangeHandler}
            handleRef={categorySelectRef}
          />

          <ListLocations
            selectedItems={selectedLocations}
            handleSelect={locationChangeHandler}
            handleRef={locationSelectRef}
          />

          <ListDiscounts
            selectedItems={selectedDiscount}
            handleSelect={discountChangeHandler}
          />

          <div className="row">
            <div className="formInput col">
              <label htmlFor="adultPrice">Adult Price</label>
              <input
                id="adultPrice"
                type="number"
                min="0"
                placeholder="Enter Adult Price"
                value={enteredAdultPrice}
                onChange={adultPriceChangeHandler}
                ref={adultPriceInputRef}
              />
            </div>
            <div className="formInput col">
              <label htmlFor="childPrice">Child Price</label>
              <input
                id="childPrice"
                type="number"
                min="0"
                placeholder="Enter Child Price"
                value={enteredChildPrice}
                onChange={childPriceChangeHandler}
                ref={childPriceInputRef}
              />
            </div>
            <div className="formInput col">
              <label htmlFor="babyPrice">Baby Price</label>
              <input
                id="babyPrice"
                type="number"
                min="0"
                placeholder="Enter Baby Price"
                value={enteredBabyPrice}
                onChange={babyPriceChangeHandler}
                ref={babyPriceInputRef}
              />
            </div>
          </div>

          <div>
            <label>Image Files</label>
            <UploadImages onUploadComplete={handleUploadComplete} />
          </div>

          <div className="formInput">
            <label htmlFor="img1">Img1</label>
            <div className="d-flex align-items-center">
              <input
                id="img1"
                type="text"
                min="0"
                placeholder="Enter url Img1"
                value={enteredImg1}
                onChange={img1ChangeHandler}
                ref={img1InputRef}
              />
              {enteredImg1 && (
                <img
                  src={enteredImg1}
                  alt="img1"
                  height="35"
                  className="ms-2 rounded"
                />
              )}
            </div>
          </div>
          <div className="formInput">
            <label htmlFor="img2">Img2</label>
            <div className="d-flex align-items-center">
              <input
                id="img2"
                type="text"
                min="0"
                placeholder="Enter url Img2"
                value={enteredImg2}
                onChange={img2ChangeHandler}
                ref={img2InputRef}
              />
              {enteredImg2 && (
                <img
                  src={enteredImg2}
                  alt="img2"
                  height="35"
                  className="ms-2 rounded"
                />
              )}
            </div>
          </div>
          <div className="formInput">
            <label htmlFor="img3">Img3</label>
            <div className="d-flex align-items-center">
              <input
                id="img3"
                type="text"
                min="0"
                placeholder="Enter url Img3"
                value={enteredImg3}
                onChange={img3ChangeHandler}
                ref={img3InputRef}
              />
              {enteredImg3 && (
                <img
                  src={enteredImg3}
                  alt="img3"
                  height="35"
                  className="ms-2 rounded"
                />
              )}
            </div>
          </div>
          <div className="formInput">
            <label htmlFor="img4">Img4</label>
            <div className="d-flex align-items-center">
              <input
                id="img4"
                type="text"
                min="0"
                placeholder="Enter url Img4"
                value={enteredImg4}
                onChange={img4ChangeHandler}
                ref={img4InputRef}
              />
              {enteredImg4 && (
                <img
                  src={enteredImg4}
                  alt="img4"
                  height="35"
                  className="ms-2 rounded"
                />
              )}
            </div>
          </div>

          <div className="formInput">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              type="text"
              placeholder="Enter Description"
              rows="6"
              value={enteredDesc}
              onChange={descChangeHandler}
              ref={descInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="warn">Warning</label>
            <textarea
              id="warn"
              type="text"
              placeholder="Enter Warning"
              rows="4"
              value={enteredWarn}
              onChange={warnChangeHandler}
              ref={warnInputRef}
            />
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/tours')}
          >
            Cancel
          </button>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default NewTour;
