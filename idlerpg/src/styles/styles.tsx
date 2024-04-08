import {styled} from "solid-styled-components";
import {
    backgroundColor,
    highlightColor, primaryColor,
    primaryTrimColor,
    secondaryColor,
    textPrimaryColor,
    transparentColor
} from "./colors";

export const CoreText = styled.p`
    color: ${textPrimaryColor};
    font-size: 24px;
`;

export const GameView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5rem 0.5rem;
`;

export const HeaderBanner = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: fit-content;
    background-color: ${secondaryColor}; // Set default if not exported
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

export const FullImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;


export const StyledTaskView = styled.div`
    position: fixed;
    bottom: 0; /* Anchor to bottom */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally with offset */
    width: 60vw; /* Set width */
    height: fit-content;
    background-color: ${secondaryColor}; /* Set default background color */
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-width: 5px;
`;

export const TaskProgressBarContainer = styled.div`
    width: 90%; /* Adjust width as needed */
    height: 50px; /* Adjust height as needed */
    background-color: ${highlightColor};
    border-radius: 5px;
`;

export const TaskProgressBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryColor};
    transition: width ${props => props.transitionDuration}s linear;
`;
