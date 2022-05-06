import { node, string } from "prop-types";
import { DropdownProvider } from "./dropdown";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, userAgent }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      <DropdownProvider>{children}</DropdownProvider>
    </UserAgentProvider>
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
