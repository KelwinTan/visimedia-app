import { PRINTER } from "assets/image";
import Image from "next/image";
import { bool, number, string } from "prop-types";

const PrinterIcon = ({ width, height, className, priority }) => {
  return (
    <Image
      width={width}
      height={height}
      layout="fixed"
      src={PRINTER}
      alt="print"
      className={className}
      priority={priority}
    />
  );
};

PrinterIcon.propTypes = {
  width: number,
  height: number,
  className: string,
  priority: bool,
};
PrinterIcon.defaultProps = {
  width: 48,
  height: 48,
  className: "",
  priority: false,
};
export default PrinterIcon;
