import {Component, For} from "solid-js";
import {CoreText} from "../styles/styles";
import skillBuilder from "../data/SkillBuilder";
import SkillView from "./SkillView";
import useSkills from "../contexts/SkillsContext";

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
                    {(skillValue, index) => (<SkillView skillValue={skillValue}/>)}
                </For>
            </div>
        </div>
    );
};

export default ProfileView;