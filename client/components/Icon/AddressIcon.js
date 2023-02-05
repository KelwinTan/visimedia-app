import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const AddressIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faAddressCard}
    />
  );
};

AddressIcon.propTypes = {
  color: string,
  width: number,
  height: number,
};

AddressIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default AddressIcon;
