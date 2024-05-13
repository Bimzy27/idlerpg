import {Component, For} from "solid-js";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {ColumnCenterAlignedView, ContentFitView, CoreText} from "../../styles/styles";
import SkillView from "./SkillView";

interface ISkillsViewProps {
}

const SkillsView: Component<ISkillsViewProps> = (props) => {
    const skills = useSkills() as SkillsData;

    return (
        <ContentFitView>
            <ColumnCenterAlignedView>
                <CoreText>Skills</CoreText>
                <div style={{display: 'grid', "grid-gap": '15px', "grid-template-columns": 'repeat(3, 1fr)'}}>
                    <For each={skills?.skills}>
                        {(skillValue, index) => (<SkillView skillId={skillValue.id}/>)}
                    </For>
                </div>
            </ColumnCenterAlignedView>
        </ContentFitView>
    );
};

export default SkillsView;