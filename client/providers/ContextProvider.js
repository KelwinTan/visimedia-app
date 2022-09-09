import { node, string } from "prop-types";

import AuthProvider from "./auth";
import CategoryProvider from "./categories";
import AsideProvider from "./aside";
import UserAgentProvider from "./user-agent";

const ContextProvider = ({ children, userAgent, auth }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      <AuthProvider {...auth}>
        <AsideProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </AsideProvider>
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
