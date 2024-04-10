import {Component, Show} from "solid-js";
import {IReward, ItemReward, SkillReward} from "../models/Reward";
import ItemView from "./ItemView";
import ExpView from "./ExpView";

interface IRewardViewProps {
    reward:IReward
}

const RewardView: Component<IRewardViewProps> = (props) => {
    return (
        <div>
            <Show when={typeof props.reward === 'object' && props.reward instanceof ItemReward}>
                <ItemView amount={(props.reward as ItemReward).itemAmount.amount} id={(props.reward as ItemReward).itemAmount.id}></ItemView>
            </Show>
            <Show when={typeof props.reward === 'object' && props.reward instanceof SkillReward}>
                <ExpView exp={(props.reward as SkillReward).skillValue.exp} id={(props.reward as SkillReward).skillValue.id}></ExpView>
            </Show>
        </div>
    );
};


export default RewardView;