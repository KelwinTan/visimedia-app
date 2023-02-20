import { ANTER_AJA } from "assets/image";
import Image from "next/legacy/image";

const AnterAjaIcon = () => {
  return (
    <Image
      width={75}
      height={30}
      layout="fixed"
      src={ANTER_AJA}
      alt="anter-aja"
    />
  );
};

export default AnterAjaIcon;
