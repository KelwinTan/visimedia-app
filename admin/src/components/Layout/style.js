import { css } from "@emotion/css";
import COLORS from "../../shared/colors";

export const styLogo = css`
  width: 130px;

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const styLayout = css`
  height: 100%;

  .header {
    background-color: ${COLORS.primary};
    display: flex;

    .menu {
      margin-left: auto;
      background-color: transparent;
    }
  }
  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  .site-layout-background {
    background: #fff;
  }
`;
