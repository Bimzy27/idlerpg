import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IRunecraftingViewProps
{
}

const RunecraftingView: Component<IRunecraftingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'runecrafting'}
                navigationTabs={ [] }/>
        </div>
    );
};

export default RunecraftingView;