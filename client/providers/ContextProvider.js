import { node, string } from "prop-types";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, userAgent }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>{children}</UserAgentProvider>
  );
};

ContextProvider.propTypes = {
  children: node.isRequired,
  userAgent: string,
};

ContextProvider.defaultProps = {
  userAgent: "",
};

export default ContextProvider;
