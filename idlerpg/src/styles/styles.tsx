import {styled} from "solid-styled-components";
import {primaryTrimColor, secondaryColor, transparentColor} from "./colors";

export const HeaderBanner = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  background-color: ${secondaryColor}; // Set default if not exported
  padding: 0.75rem 0;
  z-index: 200;
`;

export const StyledItemView = styled.div`
    width: 100px;
    height: 100px;
    background-color: ${transparentColor};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
`;