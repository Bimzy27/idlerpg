import {Component, createMemo} from "solid-js";
import {
    ContentFitAltView,
    ContentFitView,
    CoreImage,
    CoreText,
} from "../../styles/styles";
import {getCurLevelXp, getLevel, getMaxLevel, getReqLevelXp, ISkillValue} from "../../models/Skill";
import {styled} from "solid-styled-components";
import useSkills from "../../contexts/SkillsContext";

interface ISkillViewProps {
    skillId:string
}

const StyledSkillView = styled.div`
    width: 130px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
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
        <ContentFitAltView style={{padding: '5px'}}>
            <StyledSkillView>
                <CoreImage src={`/assets/skills/${props.skillId}.png`} alt="NO IMG" width={40} height={40}></CoreImage>
                <CoreText>{curLvl()}/{getMaxLevel()}</CoreText>
                {/*<CoreText_Mid>{Math.floor(curExp())}/{reqExp()} EXP</CoreText_Mid>*/}
            </StyledSkillView>
        </ContentFitAltView>
    );
};

export default SkillView;