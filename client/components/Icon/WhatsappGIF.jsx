import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import color from "constants/color";
import { hover } from "styles/globals";
import { number, string } from "prop-types";
import Image from "next/legacy/image";
import { WHATSAPP_GIF } from "assets/image";
import { cx } from "@emotion/css";

const WhatsappGIF = ({ width, classnames, height }) => {
  return (
    <Image
      src={WHATSAPP_GIF}
      width={width}
      height={height}
      layout="fixed"
      alt="whatsapp"
      objectFit="contain"
      className={cx(classnames)}
    />
  );
};

WhatsappGIF.propTypes = {
  color: string,
  width: number,
  height: number,
  classnames: string,
};

WhatsappGIF.defaultProps = {
  color: color.primary,
  width: 24,
  height: 24,
  classnames: "",
};

export default WhatsappGIF;
