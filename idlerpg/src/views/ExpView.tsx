import {Component, Show} from "solid-js";
import {CoreImage, CoreText} from "../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../styles/colors";
import {ISkillValue} from "../models/Skill";

const StyledExpView = styled.div`
    width: 100px;
    height: 100px;
    background-color: ${backgroundAlt2Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface IExpViewProps extends ISkillValue {
}

const ExpView: Component<IExpViewProps> = (props) => {
    return (
        <StyledExpView style={{position: 'relative'}}>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/skills/${props.id}.png`} alt="NO IMG" width={60} height={60}></CoreImage>
            }/>
            <CoreText style={{'position': 'absolute', 'top': '55%', 'z-index': 1, 'text-align': 'center', "font-size": '20px'}}>{props.exp} EXP</CoreText>
        </StyledExpView>
    );
};

export default ExpView;