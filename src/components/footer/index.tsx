import "./index.scss";

import links from "@config/links";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__area">
        <div className="footer__area__logo" />
        <div className="footer__area__links">
          <div className="footer__area__links__label">Find Me On</div>
          <a href={links.github} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github footer__area__links__link"></i>
          </a>
          <a href={links.twitter} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter footer__area__links__link"></i>
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin footer__area__links__link"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
