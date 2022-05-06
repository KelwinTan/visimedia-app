import { node } from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("body"))
    : null;
};

Portal.propTypes = {
  children: node.isRequired,
};

export default Portal;
