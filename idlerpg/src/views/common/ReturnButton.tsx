import {Component, JSX} from "solid-js";
import {styled} from "solid-styled-components";
import {primaryColor, primaryTrimColor, textPrimaryColor} from "../../styles/colors";
import {CoreImage} from "../../styles/styles";
import firebase from "firebase/compat";
import functions = firebase.functions;

export const StyledReturnButton = styled.button`
    width: 80px;
    height: 80px;
    background-color: ${primaryColor};
    border-radius: 5px;
    border: 2px solid ${primaryTrimColor};
    color: ${textPrimaryColor};
    margin: 0.5em 1em;
    padding: 0.25em 1em;
`;

interface IReturnButtonProps
{
    onClick:()=>void
}

const ReturnButton : Component<IReturnButtonProps> = (props) => {
    return (
        <StyledReturnButton>
            <CoreImage width={70} height={70} onClick={props.onClick}/>
        </StyledReturnButton>
    )
}

export default ReturnButton;