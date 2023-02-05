import { MASTERCARD } from "assets/image";
import Image from "next/image";

const MastercardIcon = () => {
  return (
    <Image
      src={MASTERCARD}
      alt="mastercard"
      width={75}
      height={30}
      layout="fixed"
    />
  );
};

export default MastercardIcon;
