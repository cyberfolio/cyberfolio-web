import "./index.scss";

import Logo from "@assets/logo.png";
import Twitter from "@assets/twitter.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__area">
        <div className="footer__area__logo">
          <img src={Logo} className="footer__area__logo__image" />
          <div className="footer__area__logo__label"> Cyberfolio </div>
        </div>
        <div className="footer__area__links">
          <div className="footer__area__links__github"></div>
          <img src={Twitter} className="footer__area__links__twitter" />
          <div className="footer__area__links__linkedin"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
