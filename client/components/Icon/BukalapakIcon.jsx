import { BUKALAPAK, BUKALAPAK_ECOM } from "assets/image";
import Image from "next/legacy/image";
import { bool, number } from "prop-types";

const BukalapakIcon = ({ ecommerce, width, height }) => {
  console.log({ ecommerce });
  if (ecommerce) {
    return (
      <div style={{ position: "relative", width, height }}>
        <Image
          src={BUKALAPAK_ECOM}
          width={width}
          height={height}
          layout="fixed"
          alt="bukalapak"
          objectFit="contain"
        />
      </div>
    );
  }
  return (
    <Image
      src={BUKALAPAK}
      width={width}
      height={height}
      layout="fixed"
      alt="bukalapak"
      objectFit="contain"
    />
  );
};

BukalapakIcon.propTypes = {
  ecommerce: bool,
  width: number,
  height: number,
};

BukalapakIcon.defaultProps = {
  ecommerce: false,
  width: 75,
  height: 30,
};

export default BukalapakIcon;
