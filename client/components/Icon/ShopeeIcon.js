import { SHOPEE, SHOPEE_MARKETPLACE } from "assets/image";
import Image from "next/image";
import { bool } from "prop-types";

const ShopeeIcon = ({ marketPlace }) => {
  if (marketPlace) {
    return (
      <Image
        width={75}
        height={30}
        layout="fixed"
        src={SHOPEE_MARKETPLACE}
        alt="shopee"
        objectFit="contain"
      />
    );
  }
  return (
    <Image width={75} height={30} layout="fixed" src={SHOPEE} alt="shopee" />
  );
};

ShopeeIcon.defaultProps = {
  marketPlace: false,
};

ShopeeIcon.propTypes = {
  marketPlace: bool,
};
export default ShopeeIcon;
