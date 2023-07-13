import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Table } from 'react-bootstrap';

import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';
import { authActions } from 'store/auth';
import { handleDelete } from '../deleteUtils';
import ListHeader from 'components/UI/ListHeader/ListHeader';
import Pagination from 'components/UI/Pagination/Pagination';
import SearchDebounce from '../SearchDebounce';
import SearchRole from './SearchRole';
import UserSort from './UserSort';

const Users = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requests } = useContext(ApiContext); // Sử dụng useContext để lấy data api
  const userId = useSelector(state => state.auth.userId);

  // lấy giá trị từ params để gán làm giá trị tìm kiếm mặc định
  const params = new URLSearchParams(location.search);
  const locationSearch = {};
  for (const [key, value] of params) {
    locationSearch[key] = value;
  }

  // State lưu kết quả lọc sau khi fetch
  const [dataFetch, setDataFetch] = useState([]);
  const [totalResult, setTotalResult] = useState(null);

  // State lưu giá trị cần lọc
  const [pageNumber, setPageNumber] = useState(+locationSearch.page || 1);
  const [enteredSearchName, setEnteredSearchName] = useState(
    locationSearch.name || ''
  );
  const [enteredSearchEmail, setEnteredSearchEmail] = useState(
    locationSearch.email || ''
  );
  const [enteredSearchPhone, setEnteredSearchPhone] = useState(
    locationSearch.phone || ''
  );
  const [selectedRole, setSelectedRole] = useState(locationSearch.role || '');
  const [nameOrder, setNameOrder] = useState(locationSearch.nameOrder || '');
  const [emailOrder, setEmailOrder] = useState(locationSearch.emailOrder || '');
  const roleChangeHandler = data => {
    setPageNumber(1);
    setSelectedRole(data);
  };

  // Lấy ra url cần Fetch từ state redux
  const urlSearchFetch = requests.getUsers;
  const urlChangeStatus = requests.patchChangeStatus;
  const urlChangeRole = requests.patchChangeRole;
  const urlDelete = requests.deleteUser;

  const queryPage = pageNumber ? '?page=' + pageNumber : '';
  const queryName = enteredSearchName ? '&&name=' + enteredSearchName : '';
  const queryEmail = enteredSearchEmail ? '&&email=' + enteredSearchEmail : '';
  const queryPhone = enteredSearchPhone ? '&&phone=' + enteredSearchPhone : '';
  const queryRole = selectedRole.value ? '&&role=' + selectedRole.value : '';
  const queryEmailOrder = emailOrder ? '&&emailOrder=' + emailOrder : '';
  const queryNameOrder = nameOrder ? '&&nameOrder=' + nameOrder : '';

  const searchQuery =
    queryPage +
    queryName +
    queryEmail +
    queryPhone +
    queryRole +
    queryNameOrder +
    queryEmailOrder;
  const urlFetch = urlSearchFetch + searchQuery;

  location.search = searchQuery; // lưu lại giá trị vào location.search khi query

  // Cập nhật lại url khi location thay đổi value
  const newUrl = location.pathname + searchQuery;
  window.history.replaceState(null, null, newUrl);

  // func get data Api
  const getData = useCallback(async () => {
    try {
      const res = await fetch(urlFetch, { credentials: 'include' });
      if (res.status === 401) {
        throw new Error('Please login!');
      }
      if (res.ok) {
        const data = await res.json();
        setTotalResult(data.totalItems);
        setDataFetch(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  }, [urlFetch]);

  // hàm xử lý click edit status
  const handleChangeStatus = useCallback(
    userData => {
      const fetchChangeStatus = status => {
        fetch(urlChangeStatus, {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ userId: userData._id, status }),
          credentials: 'include',
        })
          .then(res => res.json())
          .then(data => {
            getData();
            dispatch(
              toastActions.SHOW_SUCCESS(data.message || 'Edit status success!')
            );
          })
          .catch(err => console.log(err));
      };

      confirmAlert({
        message: 'Choose new status',
        buttons: [
          {
            label: 'Active',
            onClick: () => fetchChangeStatus('active'),
          },
          {
            label: 'Inactive',
            onClick: () => fetchChangeStatus('inactive'),
          },
        ],
      });
    },
    [urlChangeStatus, getData, dispatch]
  );

  // hàm xử lý click edit role
  const handleChangeRole = useCallback(
    userData => {
      // fetch update status tran
      const fetchChangeRole = role => {
        // console.log(userData._id, role);
        fetch(urlChangeRole, {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ userId: userData._id, role }),
          credentials: 'include',
        })
          .then(res => {
            if (res.ok) {
              // nếu admin hiện tại login muốn đổi role sang user
              if (userId === userData._id && role === 'user') {
                dispatch(authActions.ON_LOGOUT());
              }
            }

            return res.json();
          })
          .then(data => {
            getData();
            dispatch(
              toastActions.SHOW_SUCCESS(data.message || 'Edit role success!')
            );
          })
          .catch(err => console.log(err));
      };

      confirmAlert({
        message: 'Change this user to the Admin role',
        buttons: [
          {
            label: 'Yes',
            onClick: () => fetchChangeRole('admin'),
          },
          { label: 'No' },
        ],
      });
    },
    [urlChangeRole, getData, dispatch, userId]
  );

  useEffect(() => {
    //  get data Api
    getData();
  }, [getData]);

  return (
    <div className="dataTable">
      <ListHeader name1="Users" name2="user" />

      <div className="mb-3 d-flex justify-content-between">
        <div className="d-flex">
          <SearchDebounce
            enteredSearch={enteredSearchName}
            onSetEnteredSearch={setEnteredSearchName}
            onSetPageNumber={setPageNumber}
            placeholder="Search name"
          />

          <SearchDebounce
            enteredSearch={enteredSearchEmail}
            onSetEnteredSearch={setEnteredSearchEmail}
            onSetPageNumber={setPageNumber}
            placeholder="Search email"
          />

          <SearchDebounce
            enteredSearch={enteredSearchPhone}
            onSetEnteredSearch={setEnteredSearchPhone}
            onSetPageNumber={setPageNumber}
            placeholder="Search phone"
          />

          <SearchRole
            selectedItem={selectedRole}
            handleSelect={roleChangeHandler}
          />
        </div>

        <UserSort
          onSetNameOrder={setNameOrder}
          onSetEmailOrder={setEmailOrder}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataFetch?.length !== 0 &&
            dataFetch.map(user => {
              return (
                <tr key={user._id}>
                  <td className="small">{user._id}</td>
                  <td className="small">{user.fullName}</td>
                  <td className="small">{user.email}</td>
                  <td className="small">{user.phone}</td>
                  <td
                    className={`cellWithStatus ${user.status}`}
                    onClick={handleChangeStatus.bind(this, user)}
                  >
                    {user.status}
                  </td>
                  <td
                    className={`cellWithStatus ${user.role}`}
                    onClick={handleChangeRole.bind(this, user)}
                  >
                    {user.role}
                  </td>
                  <td className="small">
                    <div className="cellAction">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          navigate(`/users/edit/${user._id}`, { state: user });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete.bind(
                          this,
                          user._id,
                          urlDelete,
                          getData,
                          dispatch
                        )}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Pagination
        page={pageNumber}
        totalPage={Math.ceil(parseInt(totalResult) / 8)}
        handlerChangePage={setPageNumber}
        currentProduct={dataFetch.length}
        totalProduct={totalResult}
      />
    </div>
  );
};

export default Users;
