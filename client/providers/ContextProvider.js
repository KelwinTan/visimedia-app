import { node, string } from "prop-types";

import AuthProvider from "./auth";
import DropdownProvider from "./dropdown";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, userAgent, isAuth }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      <AuthProvider isAuth={isAuth}>
        <DropdownProvider>{children}</DropdownProvider>
      </AuthProvider>
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
