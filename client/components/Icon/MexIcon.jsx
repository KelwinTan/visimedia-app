import { MEX } from "assets/image";
import Image from "next/legacy/image";

const MexIcon = () => {
  return <Image width={75} height={30} layout="fixed" src={MEX} alt="mex" />;
};

export default MexIcon;
