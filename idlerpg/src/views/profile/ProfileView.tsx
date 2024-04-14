import {Component, createSignal, For, JSX} from "solid-js";
import {CoreText} from "../../styles/styles";
import skillBuilder from "../../data/SkillBuilder";
import SkillView from "../skills/SkillView";
import useSkills from "../../contexts/SkillsContext";
import {createStore} from "solid-js/store";

interface IProfileViewProps
{

}

const ProfileView: Component<IProfileViewProps> = (props) => {
    const skills = useSkills();
    return (
        <div>
            <CoreText>Profile</CoreText>
            <div style={{ display: 'grid', "grid-gap": '15px', "grid-template-columns": 'repeat(3, 1fr)'}}>
                <For each={skills?.skills}>
                    {(skillValue, index) => (<SkillView skillId={skillValue.id}/>)}
                </For>
            </div>
        </div>
    );
};

export default ProfileView;