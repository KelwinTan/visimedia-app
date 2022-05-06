import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const HamburgerIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faEnvelope}
    />
  );
};

HamburgerIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

HamburgerIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default HamburgerIcon;
