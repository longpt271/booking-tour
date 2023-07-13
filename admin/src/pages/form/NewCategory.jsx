import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const NewCategory = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng

  const [enteredCategoryName, setEnteredCategoryName] = useState(''); // lưu value input vào state
  const categoryNameChangeHandler = e => setEnteredCategoryName(e.target.value); // handlers
  const categoryNameInputRef = useRef(); // dùng useRef() để lấy value input dùng focus()

  // xử lý submit
  const submitHandler = async e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredCategoryName.trim() === '') {
      categoryNameInputRef.current.focus();
      return;
    }

    // post new Category Api
    try {
      const res = await fetch(requests.postNewCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: enteredCategoryName.trim() }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Create Category successfully!')); // toast
        navigate('/categories'); // điều hướng
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
      <div className="top fw-bold">Add New Category</div>

      <div className="bottom bg-light">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              placeholder="Enter Category Name"
              value={enteredCategoryName}
              onChange={categoryNameChangeHandler}
              ref={categoryNameInputRef}
            />
          </div>

          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => navigate('/categories')}
          >
            Cancel
          </button>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default NewCategory;
