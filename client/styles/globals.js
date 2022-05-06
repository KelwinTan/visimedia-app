import { css } from "@emotion/css";

export const styGlobal = css`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

export const dFlex = css`
  display: flex;
`;

export const aItemsCenter = css`
  align-items: center;
`;

export const hover = css`
  :hover {
    cursor: pointer;
  }
`;

export const dGrid = css`
  display: grid;
`;

export const gridCol = (rep, size) => css`
  grid-template-columns: repeat(${rep}, ${size});
`;

export const gap = (g) => css`
  gap: ${g};
`;

export const mTop = (top) => css`
  margin-top: ${top};
`;
