import {Component, createSignal, For, JSX, Show} from "solid-js";
import SkillView from "./SkillView";
import TaskView from "../task/TaskView";
import {ColumnCenterAlignedView, CoreButton, RowCenterAlignedView} from "../../styles/styles";
import CollapseTabbedView from "../common/CollapseTabbedView";

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
    const tabs = props.navigationTabs.map((tab) => ({
        name: tab.title,
        children: (
            <TasksView taskIds={tab.taskIds}/>
        ),
    }));

    return (
        <ColumnCenterAlignedView style={{"grid-gap": '50px'}}>
            <SkillView skillId={props.skillId}/>

            <div style={{width: '100%', height: "fit-content", display: "flex", "align-items": "flex-start", "flex-wrap": "wrap", "grid-gap": '20px'}}>
                <Show when={props.navigationTabs.length === 1}>
                    <TasksView taskIds={props.navigationTabs[0].taskIds}/>
                </Show>

                <Show when={props.navigationTabs.length > 1}>
                    <CollapseTabbedView tabs={tabs}/>
                </Show>
            </div>

            {props.children}
        </ColumnCenterAlignedView>
    );
};

interface ITasksViewProps {
    taskIds:string[]
}

const TasksView: Component<ITasksViewProps> = (props) => {

    return (
        <div style={{ display: "grid", "grid-template-columns": "repeat(3, 1fr)", "padding-top": '10px', "grid-gap": '20px', width: '100%', "box-sizing": "border-box" }}>
            <For each={props.taskIds}>
                {(id, index) => (<TaskView taskId={id}/>)}
            </For>
        </div>
    );
};

export default SkillContentView;