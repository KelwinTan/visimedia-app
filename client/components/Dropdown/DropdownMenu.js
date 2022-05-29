import Portal from "components/Portal";
import { useDropdown } from "providers/dropdown";
import { forwardRef } from "react";
import { styDropdownMenu } from "./style";

export default forwardRef(function DropdownMenu({ children }, ref) {
  const {
    position: { x, y },
    visible,
  } = useDropdown();

  return (
    <Portal>
      <div
        style={{ top: y, left: x }}
        className={styDropdownMenu({ visible })}
        ref={ref}
      >
        {children}
      </div>
    </Portal>
  );
});
