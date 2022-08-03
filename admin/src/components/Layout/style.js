import { css } from "@emotion/css";
import COLORS from "../../shared/colors";

export const styLogo = css`
  width: 130px;

  .image {
  }
`;

export const styLogoImage = css`
  width: 100%;
  height: 100%;
  object-fit: contain;

  &:hover {
    cursor: pointer;
  }
`;

export const styHeader = css`
  background-color: ${COLORS.white};
  display: flex;
  padding-left: 10px;
`;

export const styAuthLabel = css`
  margin-left: 8px;
  color: rgba(49, 53, 59, 0.68);
  font-weight: 800;
`;

export const styMenu = css`
  margin-left: auto;
  background-color: transparent;
  color: rgba(49, 53, 59, 0.68);
`;

export const styLayout = css`
  height: 100%;
`;

export const stySiteLayoutBg = css`
  background: #fff;
`;

export const styContent = css({
  padding: 24,
  margin: 0,
  minHeight: 280,
});
export const stySider = css`
  border-top: 1px solid #f2f2f2;
  padding-top: 15px;
`;

export const styNavItem = css`
  font-weight: bold;

  &.ant-menu-item-selected {
    color: ${COLORS.light};

    &.ant-menu-item::after {
      border-right-color: ${COLORS.secondary};
    }
  }
`;
