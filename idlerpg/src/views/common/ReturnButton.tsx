import {Component} from "solid-js";
import {styled} from "solid-styled-components";
import {primaryColor, primaryTrimColor, textPrimaryColor} from "../../styles/colors";

export const StyledReturnButton = styled.button`
    width: 140px;
    height: 80px;
    background-color: ${primaryColor};
    border-radius: 5px;
    border: 2px solid ${primaryTrimColor};
    color: ${textPrimaryColor};
    margin: 0.5em 1em;
    padding: 0; /* Remove padding to accommodate image */
    display: flex; /* Allow image to occupy space */
    align-items: center; /* Center image vertically */
    justify-content: center; /* Center image horizontally */
`;

interface IReturnButtonProps
{
    onReturn:()=>void
}

const ReturnButton : Component<IReturnButtonProps> = (props) => {
    return (
        <StyledReturnButton>
            <img src={`/assets/ui/returnArrow.png`} style={{width: '100%', height: '100%'}} onClick={()=>{props.onReturn()}}/>
        </StyledReturnButton>
    )
}

export default ReturnButton;