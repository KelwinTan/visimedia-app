import { SHOPEE } from "assets/image";
import Image from "next/image";

const ShopeeIcon = () => {
  return (
    <Image width={75} height={30} layout="fixed" src={SHOPEE} alt="shopee" />
  );
};

export default ShopeeIcon;
