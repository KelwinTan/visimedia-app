import { node, string } from "prop-types";

import AuthProvider from "./auth";
import CategoryProvider from "./categories";
import DropdownProvider from "./dropdown";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, userAgent, auth }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      <AuthProvider {...auth}>
        <DropdownProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </DropdownProvider>
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
