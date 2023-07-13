import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from 'utils/calcPrice';

// Lấy ra listCart từ localStorage
const dataGetStorage = localStorage.getItem('cart');
// Xử lý data nhận về
let listCartLocal = dataGetStorage && JSON.parse(dataGetStorage).listCart;
let totalMoneyLocal = dataGetStorage && JSON.parse(dataGetStorage).totalMoney;

// initial State cart
const initialCartState = {
  listCart: listCartLocal || [],
  totalMoney: totalMoneyLocal || 0,
};

// console.log(initialCartState);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    SET_CART(state, action) {
      const listCartPayload = action.payload;
      const updatedTotalMoney = listCartPayload.reduce((curNumber, item) => {
        return (
          curNumber +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.adultPrice,
            item.adultQuantity
          ) +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.childPrice,
            item.childQuantity
          ) +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.babyPrice,
            item.babyQuantity
          )
        );
      }, 0);

      // lưu lại state cart
      state.listCart = listCartPayload;
      state.totalMoney = updatedTotalMoney;
      // lưu lại vào localStorage
      localStorage.setItem(
        'cart',
        JSON.stringify({
          listCart: listCartPayload,
          totalMoney: state.totalMoney,
        })
      );
    },
    UPDATE_CART(state, action) {
      // Tìm id trùng với id payload
      const existingCartItemIndex = state.listCart.findIndex(
        item =>
          item.tourId._id.toString() === action.payload.tourId._id.toString()
      );
      const existingCartItem = state.listCart[existingCartItemIndex];

      let updatedListCart;
      if (existingCartItem) {
        // số lượng sp sẽ update
        const updateAdultQuantity =
          +existingCartItem.adultQuantity +
          (action.payload.adultQuantity ? +action.payload.adultQuantity : 0);
        const updateChildQuantity =
          existingCartItem.childQuantity +
          (action.payload.childQuantity ? +action.payload.childQuantity : 0);
        const updateBabyQuantity =
          existingCartItem.babyQuantity +
          (action.payload.babyQuantity ? +action.payload.babyQuantity : 0);

        const totalUpdateQuantity =
          updateAdultQuantity + updateChildQuantity + updateBabyQuantity;

        // Gộp số lượng sản phẩm nếu tổng updatedQuantity > 0
        if (totalUpdateQuantity > 0) {
          const updatedItem = {
            ...existingCartItem,
            startDate: action.payload.startDate,
            adultQuantity: updateAdultQuantity,
            childQuantity: updateChildQuantity,
            babyQuantity: updateBabyQuantity,
          };
          updatedListCart = [...state.listCart];
          updatedListCart[existingCartItemIndex] = updatedItem;
        } else {
          // Xóa sản phẩm nếu tổng updatedQuantity = 0
          updatedListCart = [...state.listCart];
          updatedListCart.splice(existingCartItemIndex, 1);
        }
      }

      const updatedTotalMoney = updatedListCart.reduce((curNumber, item) => {
        return (
          curNumber +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.adultPrice,
            item.adultQuantity
          ) +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.childPrice,
            item.childQuantity
          ) +
          calcTotalPrice(
            item.tourId.discountId,
            item.tourId.babyPrice,
            item.babyQuantity
          )
        );
      }, 0);

      // lưu lại state cart
      state.listCart = updatedListCart;
      state.totalMoney = updatedTotalMoney;

      // lưu lại vào localStorage
      localStorage.setItem(
        'cart',
        JSON.stringify({
          listCart: updatedListCart,
          totalMoney: updatedTotalMoney,
        })
      );
    },
    DELETE_CART(state, action = { id: '', shouldListen: false }) {
      // Nếu nhận vào payload.shouldListen = true thì mới thực hiện
      if (action.payload.shouldListen) {
        // Tìm id của item
        const existingCartItemIndex = state.listCart.findIndex(
          item => item.tourId._id.toString() === action.payload._id.toString()
        );
        const existingItem = state.listCart[existingCartItemIndex];

        // Tính lại giá trị ,money, total
        const updatedTotalMoney =
          state.totalMoney -
          calcTotalPrice(
            existingItem.tourId.discountId,
            existingItem.tourId.adultPrice,
            existingItem.adultQuantity
          ) -
          calcTotalPrice(
            existingItem.tourId.discountId,
            existingItem.tourId.childPrice,
            existingItem.childQuantity
          ) -
          calcTotalPrice(
            existingItem.tourId.discountId,
            existingItem.tourId.babyPrice,
            existingItem.babyQuantity
          );

        // lấy ra tất cả cart có giá trị khác id payload nhận vào
        let updatedListCart = state.listCart.filter(
          item => item.tourId._id.toString() !== action.payload._id.toString()
        );

        // Giá trị trả về sau khi delete
        state.listCart = updatedListCart;
        state.totalMoney = updatedTotalMoney;

        // Nếu k còn cart nào xóa khỏi storage
        if (updatedListCart.length === 0) {
          localStorage.removeItem('cart');
        } else {
          // lưu lại vào localStorage
          localStorage.setItem(
            'cart',
            JSON.stringify({
              listCart: updatedListCart,
              totalMoney: updatedTotalMoney,
            })
          );
        }
      }
    },
    SET_DEFAULT(state) {
      state.listCart = [];
      state.totalMoney = 0;

      localStorage.removeItem('cart');
    },
  },
});

// Phương thức tạo actions
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
