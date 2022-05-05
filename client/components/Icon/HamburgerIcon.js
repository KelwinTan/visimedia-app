import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";

const HamburgerIcon = () => {
  return (
    <FontAwesomeIcon
      style={{ color: color.primary, width: 32, height: 32, marginRight: 10 }}
      className={hover}
      icon={faBars}
    />
  );
};

export default HamburgerIcon;
