import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IFiremakingViewProps
{
}

const FiremakingView: Component<IFiremakingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'firemaking'}
                navigationTabs={ [] }/>
        </div>
    );
};

export default FiremakingView;