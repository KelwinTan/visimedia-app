import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const FacebookIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faFacebook}
    />
  );
};

FacebookIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

FacebookIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default FacebookIcon;
