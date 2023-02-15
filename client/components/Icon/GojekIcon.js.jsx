import { GOJEK } from "assets/image";
import Image from "next/image";

const GojekIcon = () => {
  return (
    <Image width={75} height={30} layout="fixed" src={GOJEK} alt="gojek" />
  );
};

export default GojekIcon;
