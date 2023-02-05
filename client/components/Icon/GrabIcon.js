import { GRAB } from "assets/image";
import Image from "next/image";

const GrabIcon = () => {
  return <Image width={75} height={30} layout="fixed" src={GRAB} alt="grab" />;
};

export default GrabIcon;
