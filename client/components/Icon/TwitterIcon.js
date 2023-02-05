import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const TwitterIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faTwitter}
    />
  );
};

TwitterIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

TwitterIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default TwitterIcon;
