import { TOKOPEDIA, TOKOPEDIA_ECOM } from "assets/image";
import Image from "next/image";
import { bool, number } from "prop-types";

const TokopediaIcon = ({ ecommerce, width, height }) => {
  if (ecommerce) {
    return (
      <Image
        src={TOKOPEDIA_ECOM}
        width={width}
        height={height}
        layout="fixed"
        alt="tokopedia"
        objectFit="contain"
      />
    );
  }
  return (
    <Image
      src={TOKOPEDIA}
      width={width}
      height={height}
      layout="fixed"
      alt="tokopedia"
      objectFit="contain"
    />
  );
};

TokopediaIcon.propTypes = {
  ecommerce: bool,
  width: number,
  height: number,
};

TokopediaIcon.defaultProps = {
  ecommerce: false,
  width: 75,
  height: 30,
};
export default TokopediaIcon;
