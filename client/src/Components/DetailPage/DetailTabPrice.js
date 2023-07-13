const { Table } = require('react-bootstrap');

const DetailTabPrice = ({ tourData, calcDisPrice }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Loại vé</th>
            <th>Giá tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Người lớn:</td>
            <td>
              <b>{calcDisPrice(tourData.discountId, tourData.adultPrice)} </b>
              <del>{tourData.adultPrice.toLocaleString('vi-VN')}đ</del>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Trẻ em:</td>
            <td>
              <b>{calcDisPrice(tourData.discountId, tourData.childPrice)} </b>
              <del>{tourData.childPrice.toLocaleString('vi-VN')}đ</del>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Em bé:</td>
            <td>
              <b>{calcDisPrice(tourData.discountId, tourData.babyPrice)} </b>
              <del>{tourData.babyPrice.toLocaleString('vi-VN')}đ</del>
            </td>
          </tr>
        </tbody>
      </Table>
      {tourData.discountId && tourData.count !== 0 && (
        <span className="fw-bold text-danger border border-danger rounded px-2 py-1 me-2">
          {tourData.discountId.name} - Giảm {tourData.discountId.percentOff}%
        </span>
      )}
    </>
  );
};

export default DetailTabPrice;
