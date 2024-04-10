import {Component} from "solid-js";
import {CoreImage, CoreText, CoreText_Mid} from "../styles/styles";
import skillBuilder from "../data/SkillBuilder";
import {getCurLevelXp, getLevel, getMaxLevel, getReqLevelXp, ISkillValue} from "../models/Skill";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../styles/colors";

interface ISkillViewProps {
    skillValue:ISkillValue
}

const StyledSkillView = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    grid-gap: 10px;
    padding: 10px;
`;


const SkillView: Component<ISkillViewProps> = (props) => {
    const curLvl = () => getLevel(props.skillValue);
    const curExp = () => getCurLevelXp(props.skillValue);
    const reqExp = () => getReqLevelXp(props.skillValue);

    return (
        <StyledSkillView>
            <CoreImage src={`/assets/skills/${props.skillValue.id}.png`} alt="NO IMG" width={50} height={50}></CoreImage>
            <CoreText>{skillBuilder[props.skillValue.id].name}</CoreText>
            <CoreText>{curLvl()}/{getMaxLevel()} LVL</CoreText>
            <CoreText_Mid>{curExp()}/{reqExp()} EXP</CoreText_Mid>
        </StyledSkillView>
    );
};

export default SkillView;