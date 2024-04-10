import {IReward, ItemReward} from "../models/Reward";
import {Component, Show} from "solid-js";
import {IRequirement, SkillRequirement} from "../models/Requirement";
import LevelView from "./LevelView";

interface IRequirementViewProps {
    requirement:IRequirement
}

const RequirementView: Component<IRequirementViewProps> = (props) => {
    return (
        <div>
            <Show when={typeof props.requirement === 'object' && props.requirement instanceof SkillRequirement}>
                <LevelView exp={(props.requirement as SkillRequirement).skillValue.exp} id={(props.requirement as SkillRequirement).skillValue.id}></LevelView>
            </Show>
        </div>
    );
};


export default RequirementView;