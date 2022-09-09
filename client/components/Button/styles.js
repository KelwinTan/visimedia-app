import { css } from "@emotion/css";
import color from "constants/color";

export const styButton = css`
  border-radius: 8px;
  padding: 8px;
`;

export const styButtonPrimary = css`
  background-color: ${color.primary};
  border: 1px solid ${color.primary};
  color: white;
`;

export const styButtonSecondary = css`
  background-color: ${color.secondary};
  color: white;
`;

export const styButtonGhost = css`
  background-color: white;
  color: ${color.primary};
`;
