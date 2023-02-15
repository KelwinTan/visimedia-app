import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";

const UserIcon = () => {
  return (
    <FontAwesomeIcon
      style={{ width: 32, height: 32, color: color.primary }}
      icon={faUser}
    />
  );
};

export default UserIcon;
