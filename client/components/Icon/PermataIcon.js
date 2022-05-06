import { PERMATA } from "assets/image";
import Image from "next/image";

const PermataIcon = () => {
  return (
    <Image src={PERMATA} alt="permata" width={75} height={30} layout="fixed" />
  );
};

export default PermataIcon;
