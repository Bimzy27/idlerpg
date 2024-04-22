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
                navigationTabs={ [
                    {
                        title: 'cooking',
                        taskIds: ['cooking_shrimp', 'cooking_meat', 'cooking_chicken',]
                    }
                ] }/>
        </div>
    );
};

export default CookingView;