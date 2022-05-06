import { css } from "@emotion/css";
import color from "constants/color";
import { dGrid, gap, gridCol, hover } from "styles/globals";

export const footerItem = css`
  display: flex;
  flex-direction: column;

  .link {
    ${hover};
    margin: 0.3rem 0;
  }
`;

export const styFooterGrid = css`
  ${dGrid};
  ${gridCol(3, "1fr")};
  ${gap("8px")}
`;

export const styFooter = css`
  border-top: 6px solid ${color.primary};
  padding-top: 8px;
`;
