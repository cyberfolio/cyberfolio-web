import "./index.scss";

import AppConstants from "constants/index";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__area">
        <div className="footer__area__logo" />
        <div className="footer__area__links">
          <div className="footer__area__links__label">Find Me On</div>
          <a href={AppConstants.GitHub} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github footer__area__links__link"></i>
          </a>

          <a href={AppConstants.LinkedIn} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin footer__area__links__link"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
