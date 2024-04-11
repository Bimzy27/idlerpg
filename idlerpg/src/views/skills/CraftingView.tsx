import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface ICraftingViewProps
{
}

const CraftingView: Component<ICraftingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'crafting'}
                navigationTabs={ [] }/>
        </div>
    );
};

export default CraftingView;