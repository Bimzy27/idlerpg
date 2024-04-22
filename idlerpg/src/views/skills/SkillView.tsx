import {Accessor, Component, createMemo} from "solid-js";
import {CoreImage, CoreText, CoreText_Mid} from "../../styles/styles";
import skillBuilder from "../../data/SkillBuilder";
import {getCurLevelXp, getLevel, getMaxLevel, getReqLevelXp, ISkillValue} from "../../models/Skill";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";

interface ISkillViewProps {
    skillId:string
}

const StyledSkillView = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    grid-gap: 10px;
    padding: 10px;
`;


const SkillView: Component<ISkillViewProps> = (props) => {
    const skills = createMemo(() => useSkills(), []);

    const curLvl = () =>
    {
        const skillValue:ISkillValue = skills()?.skills.find(skill => skill.id === props.skillId) || {id: 'none', exp: 0};
        return getLevel(skillValue);
    };
    const curExp = () =>
    {
        const skillValue:ISkillValue = skills()?.skills.find(skill => skill.id === props.skillId) || {id: 'none', exp: 0};
        return getCurLevelXp(skillValue);
    };
    const reqExp = () =>
    {
        const skillValue:ISkillValue = skills()?.skills.find(skill => skill.id === props.skillId) || {id: 'none', exp: 0};
        return getReqLevelXp(skillValue);
    };

    return (
        <StyledSkillView>
            <CoreImage src={`/assets/skills/${props.skillId}.png`} alt="NO IMG" width={50} height={50}></CoreImage>
            <CoreText>{skillBuilder[props.skillId].name}</CoreText>
            <CoreText>{curLvl()}/{getMaxLevel()} LVL</CoreText>
            <CoreText_Mid>{Math.floor(curExp())}/{reqExp()} EXP</CoreText_Mid>
        </StyledSkillView>
    );
};

export default SkillView;