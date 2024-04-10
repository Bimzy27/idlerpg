import {getLevel, ISkillValue} from "../models/Skill";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../styles/colors";
import {Component, Show} from "solid-js";
import {CoreImage, CoreText} from "../styles/styles";

interface ILevelViewProps extends ISkillValue {
}

const StyledLevelView = styled.div`
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

const LevelView: Component<ILevelViewProps> = (props) => {
    return (
        <StyledLevelView style={{position: 'relative'}}>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/skills/${props.id}.png`} alt="NO IMG" width={60} height={60}></CoreImage>
            }/>
            <CoreText style={{'position': 'absolute', 'top': '40%', 'z-index': 1, 'text-align': 'center'}}>{getLevel(props)} LVL</CoreText>
        </StyledLevelView>
    );
};

export default LevelView;