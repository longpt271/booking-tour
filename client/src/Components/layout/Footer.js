import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import classes from './Footer.module.css';
import Copyright from './Copyright';

// Tạo footer by bootstrap 5
const Footer = () => {
  const MenuItem = ({ url, text }) => (
    <li>
      <Link to={url}>
        <FontAwesomeIcon icon={faAngleRight} className="me-2" />
        {text}
      </Link>
    </li>
  );
  return (
    <>
      <footer className={`${classes.footer} w-100 pt-5 pb-3 flex-shrink-0`}>
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-4 col-md-7">
              <h6 className="text-white fw-bold text-uppercase mb-3">
                Our Office
              </h6>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">
                  <FontAwesomeIcon icon={faLocationDot} className="me-3" />
                  Hanoi, Vietnam
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faPhone} className="me-3" />
                  0976622288
                </li>
                <li className="mb-2 text-lowercase">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                  banoididulichthoii@gmail.com
                </li>
                <div
                  className={`${classes['footer-brands']} pt-2 justify-content-center justify-content-md-start`}
                >
                  <a
                    className="btn btn-square btn-outline-light rounded-circle"
                    href="https://www.facebook.com/profile.php?id=100085923745569"
                    target="_blank"
                    rel="noReferrer"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a
                    className="btn btn-square btn-outline-light rounded-circle"
                    href="https://www.instagram.com/banoididulichthoii"
                    target="_blank"
                    rel="noReferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <Link
                    className="btn btn-square btn-outline-light rounded-circle"
                    to="/"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </Link>
                </div>
              </ul>
            </div>

            <div className="col-lg-4 col-md-5 d-none d-md-block">
              <h6 className="text-white fw-bold text-uppercase mb-3">
                COMPANY
              </h6>
              <ul className="list-unstyled text-muted">
                <MenuItem url="#" text="What We Do" />
                <MenuItem url="#" text="Returns &amp; Refunds" />
                <MenuItem url="#" text="Online Stores" />
                <MenuItem url="#" text="FAQs" />
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 d-none d-lg-block">
              <h6 className="text-white fw-bold text-uppercase mb-3">
                Quick Links
              </h6>
              <ul className="list-unstyled text-muted">
                <MenuItem url="#" text="About Us" />
                <MenuItem url="#" text="Contact Us" />
                <MenuItem url="#" text="Our Services" />
                <MenuItem url="#" text="Terms & Condition" />
                <MenuItem url="#" text="Support" />
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <Copyright />
    </>
  );
};

export default Footer;
