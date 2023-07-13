export const calcPrice = (discountId, price) => {
  const discountedPrice = !discountId
    ? price
    : price - price * (discountId.percentOff / 100);
  return discountedPrice;
};

export const calcTotalPrice = (discountId, price, quantity) => {
  const discountedPrice = !discountId
    ? price
    : price - price * (discountId.percentOff / 100);
  return discountedPrice * quantity;
};
