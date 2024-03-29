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

export const noneSelected = css`
  use-select: none;
`;

export const radius = (_radius) => css`
  border-radius: ${_radius}px;
`;

export const w100 = css`
  width: 100%;
`;

export const height = (h) => css`
  height: ${h}px;
`;

export const dBlock = css`
  display: block;
`;

export const uMarginLeftAuto = css`
  margin-left: auto;
`;

export const styMargin = (...margin) => css`
  margin: ${margin.map((d) => `${d}px`).join(" ")};
`;

export const styTextCenter = css`
  text-align: center;
`;

export const styPlainButton = css`
  background: transparent;
  border: 0;
`;
