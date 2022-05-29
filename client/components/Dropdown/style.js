import { css } from "@emotion/css";

export const styDropdownMenu = ({ visible = false }) => css`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-width: 260px;
  width: fit-content;
  max-height: 80vh;
  overflow-y: auto;
  padding-bottom: 15px;

  position: fixed;
  opacity: ${visible ? 1 : 0};
  visibility: ${visible ? "visible" : "hidden"};
`;

// transition: all 0.3s ease;
//   ${visible &&
//   css`
//     transform: scale3d(1, 1, 0) translateY(-70px);
//   `}

export const styDropdownItem = css`
  padding: 0.5rem;
`;
