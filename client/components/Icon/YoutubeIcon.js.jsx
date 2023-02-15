import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const YoutubeIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faYoutube}
    />
  );
};

YoutubeIcon.propTyps = {
  color: string,
  width: number,
  height: number,
};

YoutubeIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default YoutubeIcon;
