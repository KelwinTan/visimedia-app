import { css } from "@emotion/css";

export const styHeader = css`
  display: flex;
  align-items: center;
`;

export const styAction = css`
  margin-left: auto;
`;

export const styMain = css`
  margin-top: 10px;
`;

export const styTitle = css`
  font-size: 20px;
  font-weight: 700;
  margin-right: 8px;

  &:before {
    content: "";
    border-radius: 40px 0 0 40px;
    width: 4px;
    background: rgb(79, 209, 90);
    margin: 0 16px 0 0;
  }
`;
