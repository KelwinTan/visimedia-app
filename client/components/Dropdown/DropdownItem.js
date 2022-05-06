import { node } from "prop-types";
import { styDropdownItem } from "./style";

export default function DropdownItem({ children }) {
  return <div className={styDropdownItem}>{children}</div>;
}

DropdownItem.propTypes = {
  children: node.isRequired,
};
