import { node } from "prop-types";
import { useDropdown } from "providers/dropdown";
import { forwardRef, useEffect } from "react";

export default forwardRef(function DropdownHeader({ children }, ref) {
  const { setPosition } = useDropdown();

  const toggleDropdownContent = () => {
    const { offsetLeft, offsetTop } = ref.current;
    setPosition(offsetLeft, offsetTop);
  };

  useEffect(() => {
    if (ref.current) {
      const { offsetLeft, offsetTop } = ref.current;
      setPosition(offsetLeft, offsetTop);
    }
  }, [ref]);

  return (
    <div ref={ref} onMouseEnter={toggleDropdownContent}>
      {children}
    </div>
  );
});
