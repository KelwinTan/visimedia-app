import { SHOPEE, SHOPEE_ECOM, SHOPEE_MARKETPLACE } from "assets/image";
import Image from "next/image";
import { bool, number } from "prop-types";

const ShopeeIcon = ({ marketPlace, ecommerce, width, height }) => {
  if (ecommerce) {
    return (
      <div style={{ position: "relative", width, height }}>
        <Image
          width={width}
          height={30}
          layout="fill"
          src={SHOPEE_ECOM}
          alt="shopee"
          objectFit="contain"
        />
      </div>
    );
  }
  if (marketPlace) {
    return (
      <Image
        width={width}
        height={height}
        layout="fixed"
        src={SHOPEE_MARKETPLACE}
        alt="shopee"
        objectFit="contain"
      />
    );
  }
  return (
    <Image
      width={width}
      height={height}
      layout="fixed"
      src={SHOPEE}
      alt="shopee"
    />
  );
};

ShopeeIcon.defaultProps = {
  marketPlace: false,
  ecommerce: false,
  width: 75,
  height: 30,
};

ShopeeIcon.propTypes = {
  marketPlace: bool,
  ecommerce: bool,
  width: number,
  height: number,
};
export default ShopeeIcon;
