import {Component, Show} from "solid-js";
import {IReward, ItemReward} from "../models/Reward";
import ItemView from "./ItemView";

interface IRewardViewProps {
    reward:IReward
}

const RewardView: Component<IRewardViewProps> = (props) => {
    return (
        <div>
            <Show when={typeof props.reward === 'object' && props.reward instanceof ItemReward}>
                <ItemView amount={(props.reward as ItemReward).itemAmount.amount} id={(props.reward as ItemReward).itemAmount.id}></ItemView>
            </Show>
        </div>
    );
};


export default RewardView;