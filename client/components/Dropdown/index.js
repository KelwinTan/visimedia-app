import { bool, node } from "prop-types";
import { useDropdown } from "providers/dropdown";
import { useCallback, useEffect } from "react";
import DropdownHeader from "./DropdownHeader";
import DropdownMenu from "./DropdownMenu";

export default function Dropdown({ header, content }) {
  const { headerRef, contentRef, setVisible } = useDropdown();

  const handleClickOutside = useCallback(
    (event) => {
      const refs = [headerRef.current, contentRef.current];
      const isIn = refs.find((r) => r?.contains?.(event.target));
      console.log({ headerRef, contentRef, isIn, target: event.target });
      if (!!isIn) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
    [headerRef, contentRef]
  );

  useEffect(() => {
    document.addEventListener("mouseover", handleClickOutside, false);

    return () => {
      document.removeEventListener("mouseover", handleClickOutside, false);
    };
  }, [handleClickOutside]);

  return (
    <>
      <DropdownHeader ref={headerRef}>{header}</DropdownHeader>
      <DropdownMenu ref={contentRef}>{content}</DropdownMenu>
    </>
  );
}

Dropdown.propTypes = {
  header: node.isRequired,
  content: node.isRequired,
};
