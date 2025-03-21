import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Enlighten us</h1>
        <div className="footer__socials">
          <a
            href="https://www.facebook.com/profile.php?id=100009442640886"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <i className="uil uil-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/thelifeof._.ayush/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <i className="uil uil-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <i className="uil uil-twitter-alt"></i>
          </a>
        </div>
      </div>
      <p className="footer__copy">
        &#169; Ayush Srivastava. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
