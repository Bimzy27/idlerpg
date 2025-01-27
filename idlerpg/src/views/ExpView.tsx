import {Component, Show} from "solid-js";
import {CoreImage, CoreText} from "../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../styles/colors";
import {ISkillValue} from "../models/Skill";

const StyledExpView = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${backgroundAlt2Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
`;

interface IExpViewProps extends ISkillValue {
}

const ExpView: Component<IExpViewProps> = (props) => {
    return (
        <StyledExpView style={{position: 'relative'}}>
            <CoreText style={{"font-size": '32px', "color": 'red'}}>XP</CoreText>
            <CoreText style={{'position': 'absolute', 'top': '40%', 'z-index': 1, 'text-align': 'center', "font-size": '18px'}}>{props.exp}</CoreText>
        </StyledExpView>
    );
};

export default ExpView;