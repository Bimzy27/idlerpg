import {styled} from "solid-styled-components";
import {
    backgroundAlt1Color, backgroundAlt2Color,primaryColor,
    primaryTrimColor,
    secondaryColor,
    textPrimaryColor,
    transparentColor
} from "./colors";

export const CoreText = styled.p`
    color: ${textPrimaryColor};
    font-size: 24px;
    line-height: 0.2;
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
    border-color: ${transparentColor};
    width: 100%;
    height: 100%;

    &:hover {
        background-color: ${'rgba(103,127,161,0.29)'}; // Set hover background color (default: slightly gray)
        cursor: pointer; // Add a cursor for hover indication
    }
`;

export const CoreImage = styled.img<{width:number, height:number}>`
    width: '${props => props.width}px';
    height: '${props => props.height}px';
    object-fit: contain;
`;

export const ColumnCenterAlignedView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    grid-gap: 5px;
`;

export const RowCenterAlignedView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    grid-gap: 5px;
`;

export const ContentFitView = styled.div`
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
    padding: 20px;
    background-color: ${backgroundAlt1Color};
    border-radius: 10px;
    border: 3px solid ${primaryTrimColor};
`;

export const ContentFitAltView = styled.div`
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    background-color: ${backgroundAlt2Color};
`;