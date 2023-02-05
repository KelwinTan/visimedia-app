import { css } from "@emotion/css";
import color from "constants/color";

export const styAside = ({ visible = false }) => css`
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  z-index: 10;
  background-color: #fff;
  transition: all 0.5s cubic-bezier(0.7, 0, 0.3, 1) 0s;
  ${visible &&
  css`
    transform: translateX(100%);
  `}
`;

export const styHeader = css`
  padding: 15px 0;
  background-color: ${color.primary};
`;

export const styAsideItem = css`
  padding: 15px 0;
  border-bottom: 1px solid #dedede;
`;
