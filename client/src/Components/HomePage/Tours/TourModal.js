import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { handleImgError } from 'utils/imageUtils';

const TourModal = ({ show, onHide, item, calcDisPrice }) => {
  const navigate = useNavigate();
  return (
    <>
      {Object.keys(item).length !== 0 && (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="h5 fw-bold">{item.name}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div
                className="col-lg-6 col-md-12"
                style={{ position: 'relative' }}
              >
                <img
                  className="w-100 rounded"
                  src={item.img1}
                  alt={item._id}
                  onError={handleImgError}
                />
                {item.discountId && (
                  <span className="current__discount" style={{ right: '17px' }}>
                    Giảm {item.discountId.percentOff}%
                  </span>
                )}
              </div>
              <div className="col-lg-6 col-md-12 lh-lg">
                <div className="p-2">
                  <span>Thời gian: </span>
                  <b>
                    {item.time} ngày {item.time - 1} đêm
                  </b>
                  <div className="locationStart">
                    <span>Nơi khởi hành: </span>
                    <b>{item.locationStart.name}</b>
                  </div>
                  <div>
                    <span>Giá: </span>
                    <span className="current__price">
                      {calcDisPrice(item.discountId, item.adultPrice)}
                    </span>
                  </div>
                  <div>
                    <span>Số chỗ còn: </span>
                    <b className="current__price">{item.count}</b>
                  </div>
                  <div>
                    <span>Mô tả: </span>
                    <b>{item.desc}</b>
                  </div>
                  <div>
                    <span>Lưu ý: </span>
                    <b>{item.warn}</b>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              onClick={() => navigate('/detail/' + item._id)}
            >
              <FontAwesomeIcon icon={faCartShopping} className="fs-6 me-2" />
              View detail
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TourModal;
