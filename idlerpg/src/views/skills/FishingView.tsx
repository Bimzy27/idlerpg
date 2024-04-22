import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface IFishingViewProps
{
}

const FishingView: Component<IFishingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'fishing'}
                navigationTabs={ [
                    {
                        title: 'fishing',
                        taskIds: ['fishing_shrimp_raw',]
                    }
                ] }/>
        </div>
    );
};

export default FishingView;