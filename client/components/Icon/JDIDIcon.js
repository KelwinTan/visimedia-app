import {
  JDID_ECOM,
  LAZADA_ECOM,
  TOKOPEDIA,
  TOKOPEDIA_ECOM,
} from "assets/image";
import Image from "next/image";
import { number } from "prop-types";

const JDIDIcon = ({ width, height }) => {
  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={JDID_ECOM}
        width={75}
        height={30}
        layout="fill"
        alt="jd-id"
        objectFit="contain"
      />
    </div>
  );
};

JDIDIcon.defaultProps = {
  width: 75,
  height: 30,
};

JDIDIcon.propTypes = {
  width: number,
  height: number,
};

export default JDIDIcon;
