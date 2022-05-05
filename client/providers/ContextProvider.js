import { node } from "prop-types";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, ...props }) => {
  console.log({ props });
  return <UserAgentProvider>{children}</UserAgentProvider>;
};

ContextProvider.propTypes = {
  children: node.isRequired,
};

export default ContextProvider;
