import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IFletchingViewProps
{
}

const FletchingView: Component<IFletchingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'fletching'}
                navigationTabs={ [] }/>
        </div>
    );
};

export default FletchingView;