import { VISA } from "assets/image";
import Image from "next/legacy/image";

const VisaIcon = () => {
  return <Image src={VISA} alt="visa" width={75} height={30} layout="fixed" />;
};

export default VisaIcon;
