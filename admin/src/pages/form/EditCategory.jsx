import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './myBasicForm.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const EditCategory = () => {
  const { requests } = useContext(ApiContext); // Sử dụng useContext
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // navigate điều hướng
  const location = useLocation(); // dùng useLocation lấy state khi navigate
  const categoryState = location.state || {};

  const [enteredCategoryName, setEnteredCategoryName] = useState(
    categoryState.name || ''
  ); // lưu value input vào state
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

    const newCategory = { name: enteredCategoryName.trim() };

    // post update category
    try {
      const res = await fetch(requests.postEditCategory, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ categoryId: categoryState._id, ...newCategory }),
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(toastActions.SHOW_SUCCESS('Update Category successfully!')); // toast
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
      <div className="top fw-bold">
        Update Category
        <small className="text-muted"> {categoryState._id}</small>
      </div>

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
          <button
            type="button"
            className="bg-secondary me-2"
            onClick={() => setEnteredCategoryName('')}
          >
            Reset
          </button>
          <button>Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditCategory;
