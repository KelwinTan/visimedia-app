import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const CloseIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ width, height, color }}
      icon={faTimes}
      className={hover}
    />
  );
};

CloseIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

CloseIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default CloseIcon;
