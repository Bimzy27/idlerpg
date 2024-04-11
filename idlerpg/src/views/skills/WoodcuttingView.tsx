import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IWoodcuttingViewProps
{
}

const WoodcuttingView: Component<IWoodcuttingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'woodcutting'}
                navigationTabs={ [
                    {
                        title: 'woodcutting',
                        taskIds: ['woodcutting_normal_log', 'woodcutting_oak_log', 'woodcutting_willow_log', 'woodcutting_maple_log', 'woodcutting_yew_log', 'woodcutting_magic_log', 'woodcutting_redwood_log']
                    }
                ] }/>
        </div>
    );
};

export default WoodcuttingView;