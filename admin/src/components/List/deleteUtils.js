import { confirmAlert } from 'react-confirm-alert';
import { toastActions } from 'store/toast';

///////// Xử lý xóa 1 phần tử
export const handleDelete = async (id, urlDelete, getData, dispatch) => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            const res = await fetch(urlDelete + '/' + id, {
              method: 'DELETE',
              credentials: 'include',
            });

            const data = await res.json();
            if (res.ok) {
              getData(); // fetch load lại data sau khi xóa
              dispatch(
                toastActions.SHOW_SUCCESS(
                  data.message ? data.message : 'Deleted successful!'
                )
              ); // toast
            } else {
              dispatch(
                toastActions.SHOW_WARN(
                  data.message ? data.message : 'Something error!'
                )
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
      { label: 'No' },
    ],
  });
};

///////// Xử lý xóa nhiều phần tử
export const handleMultiDelete = async (
  urlDeleteMulti,
  body,
  setSelected,
  getData,
  dispatch
) => {
  confirmAlert({
    message: 'Confirm to delete all checked.',
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          // fetch delete hotel/Room
          try {
            const res = await fetch(urlDeleteMulti, {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify(body),
              credentials: 'include',
            });

            const data = await res.json();
            if (res.ok) {
              getData(); // fetch load lại data sau khi xóa
              dispatch(
                toastActions.SHOW_SUCCESS(
                  data.message ? data.message : `Deleted multi successful!`
                )
              ); // toast
              setSelected([]);
            } else {
              dispatch(
                toastActions.SHOW_WARN(
                  data.message ? data.message : 'Something error!'
                )
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
      { label: 'No' },
    ],
  });
};
