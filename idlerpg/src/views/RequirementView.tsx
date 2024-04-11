import {IReward, ItemReward} from "../models/Reward";
import {Component, Show} from "solid-js";
import {IRequirement, ItemRequirement, SkillRequirement} from "../models/Requirement";
import LevelView from "./LevelView";
import ItemView from "./ItemView";

interface IRequirementViewProps {
    requirement:IRequirement
}

const RequirementView: Component<IRequirementViewProps> = (props) => {
    return (
        <div>
            <Show when={typeof props.requirement === 'object' && props.requirement instanceof SkillRequirement}>
                <LevelView exp={(props.requirement as SkillRequirement).skillValue.exp} id={(props.requirement as SkillRequirement).skillValue.id}></LevelView>
            </Show>
            <Show when={typeof props.requirement === 'object' && props.requirement instanceof ItemRequirement}>
                <ItemView amount={(props.requirement as ItemRequirement).itemAmount.amount} id={(props.requirement as ItemRequirement).itemAmount.id}></ItemView>
            </Show>
        </div>
    );
};


export default RequirementView;