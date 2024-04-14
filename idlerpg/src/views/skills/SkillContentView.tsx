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
        <ColumnCenterAlignedView>
            <SkillView skillId={props.skillId}/>

            <Show when={props.navigationTabs.length === 1}>
                <For each={props.navigationTabs[0].taskIds}>
                    {(id, index) => (<TaskView taskId={id}/>)}
                </For>
            </Show>

            <Show when={props.navigationTabs.length > 1}>
                <For each={props.navigationTabs[0].taskIds}>
                    {(id, index) => (<TaskView taskId={id}/>)}
                </For>
            </Show>

            {props.children}
        </ColumnCenterAlignedView>
    );
};

export default SkillContentView;