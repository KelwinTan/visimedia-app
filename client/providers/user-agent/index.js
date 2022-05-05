import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { node, string } from "prop-types";

const UserAgentContext = createContext({
  isMobile: false,
  isDesktop: false,
});

const mobileUA = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

const UserAgentProvider = ({ children, userAgent }) => {
  const [isMobile, setIsMobile] = useState(() => {
    return mobileUA.some((item) => {
      return userAgent?.match(item);
    });
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(() => {
      return mobileUA.some((item) => {
        return ua.match(item);
      });
    });
  }, []);

  return (
    <UserAgentContext.Provider value={{ isMobile, isDesktop: !isMobile }}>
      {children}
    </UserAgentContext.Provider>
  );
};

UserAgentProvider.propTypes = {
  children: node,
  userAgent: string.isRequired,
};

export default UserAgentProvider;

export const useUA = () => {
  return useContext(UserAgentContext);
};
