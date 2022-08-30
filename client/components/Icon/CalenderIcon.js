import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const CalenderIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faCalendarAlt}
    />
  );
};

CalenderIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

CalenderIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default CalenderIcon;
