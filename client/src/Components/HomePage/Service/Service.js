import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingDollar,
  faHeadset,
  faHiking,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Service.module.css';

const Service = () => {
  return (
    <div className={classes.service}>
      <div className="container">
        <div className="row mx-0 bg-light rounded p-5">
          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="media-body text-center ml-3">
              <FontAwesomeIcon
                style={{ fontSize: '35px' }}
                icon={faHandHoldingDollar}
                className="text-secondary mb-3"
              />
              <h6 className="fw-bold text-uppercase mb-1">Price</h6>
              <p className="text-small mb-0 text-muted">
                Always Have The Best Price
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-md-0">
            <div className="media-body text-center ml-3">
              <FontAwesomeIcon
                style={{ fontSize: '35px' }}
                icon={faHiking}
                className="text-secondary mb-3"
              />
              <h6 className="fw-bold text-uppercase mb-1">
                Products & Service
              </h6>
              <p className="text-small mb-0 text-muted">
                Diversity – Quality – Safety
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="media-body text-center ml-3">
              <FontAwesomeIcon
                style={{ fontSize: '35px' }}
                icon={faHeadset}
                className="text-secondary mb-3"
              />
              <h6 className="fw-bold text-uppercase mb-1">Support</h6>
              <p className="text-small mb-0 text-muted">
                Hotline & Online (09h00 - 21h00)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
