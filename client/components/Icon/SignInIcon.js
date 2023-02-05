import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";

const SignInIcon = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      style={{ color, width, height }}
      className={hover}
      icon={faSignIn}
    />
  );
};

SignInIcon.propTypes = {
  color: string,
  width: number,
  height: number,
};

SignInIcon.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
};

export default SignInIcon;
