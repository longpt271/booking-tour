import { createSlice } from '@reduxjs/toolkit';

const domain = 'http://localhost:5000';
const domainApi = domain + '/api';
const domainAmin = domain + '/admin';
// Tạo state mặc định
const initialApiState = {
  domain,
  // auth
  urlLogin: `${domainApi}/auth/login`,
  urlRegister: `${domainApi}/auth/signup`,
  urlVerifyCode: `${domainApi}/auth/verify-code`,
  urlForgotPassword: `${domainApi}/auth/forgot-password`,

  // users
  urlUserInfo: `${domainApi}/users/info`,
  urlChangePassword: `${domainApi}/users/change-password`,
  urlAddCart: `${domainApi}/users/cart/add`,
  urlCart: `${domainApi}/users/cart`,
  urlCreateOrder: `${domainApi}/users/create-order`,
  urlOrder: `${domainApi}/users/orders`,

  // tours
  urlSearchTours: `${domainApi}/tours/search`,
  urlTours: `${domainApi}/tours`,
  urlTour: `${domainApi}/tours/find`,
  urlRelated: `${domainApi}/tours/related`,

  getAllCategories: `${domainAmin}/categories/all`,
  getAllLocations: `${domainAmin}/locations/all`,
};

// Tạo Slice api
const apiSlice = createSlice({
  name: 'api',
  initialState: initialApiState,
});

// Phương thức tạo actions
export const apiActions = apiSlice.actions;

export default apiSlice.reducer;
