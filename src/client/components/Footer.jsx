import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGitHub,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  const date = new Date();
  let thisYear = date.getFullYear();
  return (
    <div className="footerContainer">
      <div className="footerIcon">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faDiscord} />
      </div>
      <div>
        <p>Meal Sharing App @ {thisYear}</p>
      </div>
    </div>
  );
}
export default Footer;
