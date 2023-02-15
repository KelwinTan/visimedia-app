import { LAZADA_ECOM, TOKOPEDIA, TOKOPEDIA_ECOM } from "assets/image";
import Image from "next/image";
import { number } from "prop-types";

const LazadaIcon = ({ width, height }) => {
  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={LAZADA_ECOM}
        width={width}
        height={height}
        layout="fill"
        alt="lazada"
        objectFit="contain"
      />
    </div>
  );
};

LazadaIcon.propTypes = {
  width: number,
  height: number,
};

LazadaIcon.defaultProps = {
  width: 75,
  height: 30,
};

export default LazadaIcon;
