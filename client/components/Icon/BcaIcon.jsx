import { BCA } from "assets/image";
import Image from "next/legacy/image";

const BcaIcon = () => {
  return <Image width={75} height={30} layout="fixed" src={BCA} alt="bca" />;
};

export default BcaIcon;
