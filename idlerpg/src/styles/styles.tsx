import {styled} from "solid-styled-components";
import {
    backgroundAlt1Color, backgroundAlt2Color,
    backgroundColor,
    highlightColor, primaryColor,
    primaryTrimColor,
    secondaryColor,
    textPrimaryColor,
    transparentColor
} from "./colors";
import TaskView from "../views/TaskView";

export const CoreText = styled.p`
    color: ${textPrimaryColor};
    font-size: 24px;
`;

export const CoreText_Mid = styled.p`
    color: ${textPrimaryColor};
    font-size: 16px;
`;

export const CoreButton = styled.button`
    background-color: ${primaryColor};
    border-radius: 5px;
    border: 2px solid ${primaryTrimColor};
    color: ${textPrimaryColor};
    margin: 0.5em 1em;
    padding: 0.25em 1em;
`;

export const TransparentButton = styled.button`
    background-color: ${transparentColor};
    width: 100%;
    height: 100%;
`;

export const CoreImage = styled.img<{width:number, height:number}>`
    width: '${props => props.width}';
    height: '${props => props.height}';
    object-fit: contain;
`;

export const StyledActiveTaskView = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    height: fit-content;
    background-color: ${secondaryColor};
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-width: 5px;
    border-radius: 25px;
`;

export const StyledGameView = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

export const StyledHeaderView = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 15vh;
    background-color: ${secondaryColor}; // Set default if not exported
    z-index: 200;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

export const ColumnCenterAlignedView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    grid-gap: 5px;
`;

export const RowCenterAlignedView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    grid-gap: 30px;
`;

export const TaskProgressBarContainer = styled.div`
    width: 90%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

export const TaskProgressBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryColor};
    transition: width ${props => props.transitionDuration}s linear;
    border-radius: 10px;
`;

export const StyledTaskView = styled.div`
    width: 40%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    align-items: center;
`;