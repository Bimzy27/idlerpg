import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IMiningViewProps
{
}

const MiningView : Component<IMiningViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'mining'}
                navigationTabs={ [
                    {
                        title: 'mining',
                        taskIds: ['mining_copper_ore', 'mining_tin_ore', 'mining_iron_ore', 'mining_silver_ore', 'mining_coal_ore', 'mining_gold_ore', 'mining_mithril_ore', 'mining_adamantite_ore', 'mining_runite_ore']
                    }
                    ] }/>
        </div>
    );
};

export default MiningView;