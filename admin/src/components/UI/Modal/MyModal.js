import { Button, Modal, Table } from 'react-bootstrap';

function MyModal({ show, onHide, data }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Doanh thu theo từng tháng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Tổng doanh thu</th>
              <th>Trung bình</th>
              <th>Tổng Orders</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.length !== 0 &&
              data.map(item => {
                return (
                  <tr key={Math.random()}>
                    <td className="small">
                      Tháng {item.month} năm {item.year}
                    </td>
                    <td className="small">
                      {item.totalRevenue.toLocaleString('vi-VN')} VND
                    </td>
                    <td className="small">
                      {(item.totalRevenue / item.totalOrders).toLocaleString(
                        'vi-VN'
                      )}
                      VND
                    </td>
                    <td className="small">{item.totalOrders}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
