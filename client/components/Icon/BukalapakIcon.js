import { BUKALAPAK } from "assets/image";
import Image from "next/image";

const BukalapakIcon = () => {
  return (
    <Image
      src={BUKALAPAK}
      width={75}
      height={30}
      layout="fixed"
      alt="bukalapak"
      objectFit="contain"
    />
  );
};

export default BukalapakIcon;
