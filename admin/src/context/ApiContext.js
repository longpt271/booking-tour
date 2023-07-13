import React from 'react';

// Tạo biến với định dạng tương ứng
const ApiContext = React.createContext({
  requests: {},
  mainApi: '',
});

export const ApiContextProvider = props => {
  // data API
  const mainApi = 'http://localhost:5000';
  const urlApi = mainApi + '/api';
  const urlAdmin = mainApi + '/admin';
  const requestsUrl = {
    postLogin: `${urlAdmin}/auth/login`,
    putSignUp: `${urlApi}/auth/signup`,
    getDashboard: `${urlAdmin}/dashboard`,

    getUsers: `${urlAdmin}/users`,
    urlUserInfo: `${urlApi}/users/info`, // GET, PATCH
    patchChangeStatus: `${urlAdmin}/users/status`,
    patchChangeRole: `${urlAdmin}/users/role`,
    patchResetPassword: `${urlAdmin}/users/reset-password`,
    deleteUser: `${urlAdmin}/users/delete`,

    postOrdersByUserId: `${urlApi}/users/orders`,
    getOrders: `${urlAdmin}/orders`,
    getOrdersWaiting: `${urlAdmin}/orders-waiting`,
    getOrder: `${urlApi}/users/orders`,
    patchOrderIsPay: `${urlAdmin}/orders/is-pay`,
    patchOrderStatus: `${urlAdmin}/orders/status`,

    urlSearchTours: `${urlApi}/tours/search`,
    getTour: `${urlApi}/tours/find`,
    postNewTour: `${urlAdmin}/tours/new`,
    postEditTour: `${urlAdmin}/tours/edit`,
    deleteTour: `${urlAdmin}/tours/delete`,
    deleteTours: `${urlAdmin}/tours/delete/multi`,

    getCategories: `${urlAdmin}/categories`,
    getAllCategories: `${urlAdmin}/categories/all`,
    postNewCategory: `${urlAdmin}/categories/new`,
    postEditCategory: `${urlAdmin}/categories/edit`,
    deleteCategory: `${urlAdmin}/categories/delete`,
    deleteCategories: `${urlAdmin}/categories/delete/multi`,

    getLocations: `${urlAdmin}/locations`,
    getAllLocations: `${urlAdmin}/locations/all`,
    postNewLocation: `${urlAdmin}/locations/new`,
    postEditLocation: `${urlAdmin}/locations/edit`,
    deleteLocation: `${urlAdmin}/locations/delete`,
    deleteLocations: `${urlAdmin}/locations/delete/multi`,

    getDiscounts: `${urlAdmin}/discounts`,
    getAllDiscounts: `${urlAdmin}/discounts/all`,
    postNewDiscount: `${urlAdmin}/discounts/new`,
    postEditDiscount: `${urlAdmin}/discounts/edit`,
    deleteDiscount: `${urlAdmin}/discounts/delete`,
    deleteDiscounts: `${urlAdmin}/discounts/delete/multi`,
  };

  return (
    <ApiContext.Provider
      // Value trả về khi ở child dùng useContext()
      value={{
        requests: requestsUrl,
        mainApi,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
