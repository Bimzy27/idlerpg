import {Component, For, JSX, Show} from "solid-js";
import SkillView from "./SkillView";
import TaskView from "../TaskView";
import {ColumnCenterAlignedView} from "../../styles/styles";

interface ISkillNavigationTab
{
    title:string
    taskIds:string[];
}

interface ISkillContentViewProps {
    skillId: string;
    navigationTabs:ISkillNavigationTab[];
    children?: JSX.Element;
}

const SkillContentView: Component<ISkillContentViewProps> = (props) => {
    return (
        <ColumnCenterAlignedView style={{"grid-gap": '50px'}}>
            <SkillView skillId={props.skillId}/>

            <div style={{width: '100%', height: "fit-content", display: "flex", "align-items": "flex-start", "flex-wrap": "wrap", "grid-gap": '20px'}}>

                {/*TODO implement tabs here with buttons*/}
                <Show when={props.navigationTabs.length === 1}>
                    <For each={props.navigationTabs[0].taskIds}>
                        {(id, index) => (<TaskView taskId={id}/>)}
                    </For>
                </Show>

                {/*TODO implement tabs here with buttons*/}
                <Show when={props.navigationTabs.length > 1}>
                    <For each={props.navigationTabs[0].taskIds}>
                        {(id, index) => (<TaskView taskId={id}/>)}
                    </For>
                </Show>
            </div>

            {props.children}
        </ColumnCenterAlignedView>
    );
};

export default SkillContentView;