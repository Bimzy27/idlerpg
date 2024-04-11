import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface ISmithingViewProps
{
}

const SmithingView: Component<ISmithingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'smithing'}
                navigationTabs={ [
                    {
                        title: 'smelt',
                        taskIds: ['smithing_bronze_bar', 'smithing_bronze_dagger', 'smithing_bronze_scimitar']
                    }
                ] }/>
        </div>
    );
};

export default SmithingView;