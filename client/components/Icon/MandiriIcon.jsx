import { MANDIRI } from "assets/image";
import Image from "next/legacy/image";

const MandiriIcon = () => {
  return (
    <Image src={MANDIRI} alt="mandiri" width={75} height={30} layout="fixed" />
  );
};

export default MandiriIcon;
