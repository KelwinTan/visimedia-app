import { TOKOPEDIA } from "assets/image";
import Image from "next/image";

const TokopediaIcon = () => {
  return (
    <Image
      src={TOKOPEDIA}
      width={75}
      height={30}
      layout="fixed"
      alt="tokopedia"
      objectFit="contain"
    />
  );
};

export default TokopediaIcon;
