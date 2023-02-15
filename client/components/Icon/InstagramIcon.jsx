import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const InstagramIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faInstagram}
    />
  );
};

InstagramIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

InstagramIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default InstagramIcon;
