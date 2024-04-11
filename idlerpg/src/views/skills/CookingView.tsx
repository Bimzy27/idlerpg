import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface ICookingViewProps
{
}

const CookingView: Component<ICookingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'cooking'}
                navigationTabs={ [] }/>
        </div>
    );
};

export default CookingView;