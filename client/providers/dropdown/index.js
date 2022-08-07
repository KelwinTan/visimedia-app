import { node } from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const DropdownContext = createContext({
  setPosition: (_x, _y) => {},
  position: { x: 0, y: 0 },
  setVisible: (_visible) => {},
  visible: false,
  headerRef: null,
  contentRef: null,
  toggleVisible: () => {},
});

const DropdownProvider = ({ children }) => {
  const [position, setPosition] = useState({});
  const [visible, setVisible] = useState(false);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const _setPosition = useCallback((x, y) => {
    setPosition({ x, y });
  }, []);

  const toggleVisible = useCallback(() => {
    setVisible((vis) => !vis);
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        position,
        visible,
        setPosition: _setPosition,
        headerRef,
        contentRef,
        setVisible,
        toggleVisible,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

DropdownProvider.propTypes = {
  children: node.isRequired,
};

export default DropdownProvider;

export const useDropdown = () => useContext(DropdownContext);
