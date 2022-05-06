import { css } from "@emotion/css";

export const styNav = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  -webkit-box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%);
  -ms-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%);
  background-color: white;
`;

export const inputNav = css`
  margin-left: 1rem;
  padding-right: 2rem;
`;

export const actionContainer = css`
  display: flex;
  align-items: center;
`;

export const userContainer = css`
  display: flex;
  flex-direction: column;

  a {
    color: #333333;
    font-weight: 600;
  }
`;

export const styMain = ({ isMobile = false }) => css`
  min-height: calc(100vh - 70px);
  margin-top: 66px;
  ${isMobile &&
  css`
    padding-bottom: 65px;
  `}
`;
