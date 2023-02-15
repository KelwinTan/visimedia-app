import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const WhatsappIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faWhatsapp}
    />
  );
};

WhatsappIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

WhatsappIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default WhatsappIcon;
