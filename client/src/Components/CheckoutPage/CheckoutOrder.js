import classes from './CheckoutOrder.module.css';
import { calcPrice } from 'utils/calcPrice';

const formattedDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11), nên cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // trả về Định dạng thành chuỗi "dd/mm/yyyy"
};

// Hàm tính giá tour khi có discount
function calcDisPrice(discountId, price, quantity) {
  const discountedPrice = calcPrice(discountId, price);
  const formattedPrice = (
    <span className="text-secondary">
      <span>{discountedPrice.toLocaleString('vi-VN') + 'đ'}</span>
      <span className="ms-2 d-inline-block text-end" style={{ width: '26px' }}>
        x{quantity}
      </span>
    </span>
  );
  return formattedPrice;
}

const CheckoutOrder = ({ listCart, totalMoney }) => {
  return (
    <div className={`${classes.CheckoutOrder} bg-light p-5`}>
      <h4 className="mb-3">YOUR ORDER</h4>

      {listCart.map(cart => {
        // tính endDate = startDate + time
        const endDate = new Date(
          new Date(cart.startDate).getTime() +
            cart.tourId.time * 24 * 60 * 60 * 1000
        ).toISOString();
        return (
          <div className={`${classes.orderItem} row`} key={cart.tourId._id}>
            <div className="col-xxl-7">
              <b>{cart.tourId.name} </b>

              <p className="mb-0">
                Khởi hành: <b>{cart.tourId.locationStart.name}</b>
              </p>
              <p className="mb-0">
                Ngày đi: <b>{formattedDate(cart.startDate)}</b>
              </p>
              <p className="mb-0">
                Ngày về: <b>{formattedDate(endDate)}</b>
              </p>
            </div>

            <div className="col-xxl-5 d-flex flex-column">
              {cart.tourId.discountId && (
                <span className="fw-bold text-danger text-end py-1">
                  ( Đã giảm {cart.tourId.discountId.percentOff}%)
                </span>
              )}
              {cart.adultQuantity !== 0 && (
                <div className="d-flex justify-content-between">
                  <span>Người lớn:</span>

                  {calcDisPrice(
                    cart.tourId.discountId,
                    cart.tourId.adultPrice,
                    cart.adultQuantity
                  )}
                </div>
              )}
              {cart.childQuantity !== 0 && (
                <div className="d-flex justify-content-between">
                  <span>Trẻ em:</span>

                  {calcDisPrice(
                    cart.tourId.discountId,
                    cart.tourId.childPrice,
                    cart.childQuantity
                  )}
                </div>
              )}
              {cart.babyQuantity !== 0 && (
                <div className="d-flex justify-content-between">
                  <span>Em bé:</span>

                  {calcDisPrice(
                    cart.tourId.discountId,
                    cart.tourId.babyPrice,
                    cart.babyQuantity
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className={`pt-3 d-flex justify-content-between`}>
        <b>TOTAL</b>
        <p className="fs-5 fw-bold">{totalMoney.toLocaleString('vi-VN')}đ</p>
      </div>
    </div>
  );
};

export default CheckoutOrder;
