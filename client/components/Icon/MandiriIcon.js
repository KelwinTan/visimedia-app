import { MANDIRI } from "assets/image";
import Image from "next/image";

const MandiriIcon = () => {
  return (
    <Image src={MANDIRI} alt="mandiri" width={75} height={30} layout="fixed" />
  );
};

export default MandiriIcon;
