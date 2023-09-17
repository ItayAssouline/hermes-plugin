import React from "react";
import "./footer.css";
import HFALogo from "../../js/assets/icons/HFA-LOGO.svg";

const Footer = () => {
  return (
    <div className="footer">
      <img src={HFALogo} alt="" />© 2023 HFA
    </div>
  );
};

export default Footer;
